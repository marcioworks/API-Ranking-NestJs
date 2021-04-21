import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criarJogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name)

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec()

    if (jogadorEncontrado) {
      throw new BadRequestException(`jogador com e-mail ${email} ja existe.`)
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto)
    return await jogadorCriado.save()
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec()
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    // return this.jogadores
    return await this.jogadorModel.find().exec()
  }

  async consultarPeloId(_id: string): Promise<Jogador> {
    const jogadorEncotrado = await this.jogadorModel.findOne({ _id }).exec()
    if (!jogadorEncotrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado.`)
    }

    return jogadorEncotrado
  }

  async deletarJogador(_id: string): Promise<any> {
    const jogadorEncotrado = await this.jogadorModel.findOne({ _id }).exec()
    if (!jogadorEncotrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado.`)
    }
    return await this.jogadorModel.deleteOne({ _id }).exec()
  }
}
