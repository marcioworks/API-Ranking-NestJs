import { JogadoresService } from './../jogadores/jogadores.service'
import { Categoria } from './interfaces/categoria.interface'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService
  ) {}
  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec()

    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} ja cadastrada.`)
    }

    const novaCategoria = new this.categoriaModel(criarCategoriaDto)

    return await novaCategoria.save()
  }

  async buscarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().populate('jogadores').exec()
  }

  async buscarCategoriaPeloId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria })

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada!`)
    }

    return categoriaEncontrada
  }

  async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {
    /*
    Desafio
    Escopo da exceção realocado para o próprio Categorias Service
    Verificar se o jogador informado já se encontra cadastrado
    */

    //await this.jogadoresService.consultarJogadorPeloId(idJogador)

    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    const jogadorFilter = jogadores.filter(
      (jogador) => jogador._id == idJogador
    )

    if (jogadorFilter.length == 0) {
      throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
    }

    return await this.categoriaModel
      .findOne()
      .where('jogadores')
      .in(idJogador)
      .exec()
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto
  ): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec()

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada.`)
    }

    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto })
      .exec()
  }

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    const categoria = params['categoria']
    const idJogador = params['idJogador']

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec()

    const jogadorJaCadastradoCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador)
      .exec()

    await this.jogadoresService.consultarPeloId(idJogador)

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada.`)
    }

    if (jogadorJaCadastradoCategoria.length > 0) {
      throw new BadRequestException(
        `Jogador ${idJogador} ja cadastrado na categoria ${categoria}`
      )
    }

    categoriaEncontrada.jogadores.push(idJogador)
    await this.categoriaModel.findOneAndUpdate(
      { categoria },
      { $set: categoriaEncontrada }
    )
  }
}
