import { CategoriasService } from './categorias.service'
import { Categoria } from './interfaces/categoria.interface'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { DesafioStatusValidaPipe } from 'src/desafios/pipes/desafio-status-validation.pipe'

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ): Promise<Categoria> {
    return await this.categoriasService.criarCategoria(criarCategoriaDto)
  }

  @Get()
  async buscarCategorias(): Promise<Array<Categoria>> {
    return this.categoriasService.buscarCategorias()
  }

  @Get('/:categoria')
  @UsePipes(ValidationPipe)
  async buscarCategoriaPeloId(
    @Param('categoria') categoria: string
  ): Promise<Categoria> {
    return await this.categoriasService.buscarCategoriaPeloId(categoria)
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Body(DesafioStatusValidaPipe) atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria') categoria: string
  ): Promise<void> {
    await this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDto
    )
  }

  @Post('/:categoria/jogador/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
    await this.categoriasService.atribuirCategoriaJogador(params)
  }
}
