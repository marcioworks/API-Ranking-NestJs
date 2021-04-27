import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto'
import { CategoriasService } from './../categorias/categorias.service'
import { JogadoresService } from './../jogadores/jogadores.service'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Desafio } from './interfaces/desafio.interface'
import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { DesafioStatus } from './interfaces/desafio.status.enum'

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriaService: CategoriasService
  ) {}

  async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const { jogadores, solicitante } = criarDesafioDto

    jogadores.map(async (jogador) => {
      const jogadorExiste = await this.jogadoresService.consultarPeloId(
        jogador._id
      )
      if (!jogadorExiste) {
        throw new BadRequestException(
          `O Jogador com id ${jogador._id} não existe`
        )
      }
    })

    const solitanteEhJogadorDaPartida = await jogadores.filter(
      (jogador) => jogador._id === solicitante
    )
    if (solitanteEhJogadorDaPartida.length === 0) {
      throw new BadRequestException('O solicitante deve ser um jogador')
    }

    const solicitanteTemCategoria = await this.categoriaService.consultarCategoriaDoJogador(
      solicitante
    )

    if (!solicitanteTemCategoria) {
      throw new BadRequestException(
        'O solicitante deve estar cadastrado em alguma categoria'
      )
    }

    const desafioCriado = new this.desafioModel(criarDesafioDto)
    desafioCriado.dataHoraSolicitacao = new Date()

    desafioCriado.status = DesafioStatus.PENDENTE
    return await desafioCriado.save()
    // salvar no banco
  }

  async consultarDesafios(): Promise<Desafio[]> {
    return await this.desafioModel
      .find()
      .populate('jogadores')
      .populate('solicitante')
      .populate('partida')
      .exec()
  }

  async consultarDesafiosDeUmJogador(_id: any): Promise<Array<Desafio>> {
    const jogador = await this.jogadoresService.consultarPeloId(_id)

    if (!jogador) {
      throw new BadRequestException(`Jogador com id ${_id} não encontrado`)
    }
    return await this.desafioModel
      .find()
      .where('jogadores')
      .in(_id)
      .populate('jogadores')
      .populate('solicitante')
      .populate('partida')
      .exec()
  }

  async atualizarDesafio(
    _id: string,
    atualizarDesafioDto: AtualizarDesafioDto
  ): Promise<Desafio> {
    const desafioExiste = await this.desafioModel.findOne({ _id }).exec()
    if (!desafioExiste) {
      throw new NotFoundException(`Desafio com id ${_id} não encontrado`)
    }
    if (atualizarDesafioDto.status) {
      desafioExiste.dataHoraResposta = new Date()
    }
    desafioExiste.status = atualizarDesafioDto.status
    desafioExiste.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio
    await this.desafioModel
      .findOneAndUpdate({ _id }, { $set: desafioExiste })
      .exec()

    return await this.desafioModel.findOne({ _id }).exec()
  }
}
