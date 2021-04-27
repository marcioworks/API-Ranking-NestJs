import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto'
import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { DesafiosService } from './desafios.service'
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
  Param
} from '@nestjs/common'
import { Desafio } from './interfaces/desafio.interface'
import { DesafioStatusValidaPipe } from './pipes/desafio-status-validation.pipe'

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto
  ): Promise<Desafio> {
    return await this.desafiosService.criarDesafio(criarDesafioDto)
  }

  @Get()
  async consultarDesafios(
    @Query('idJogador') _id: string
  ): Promise<Array<Desafio>> {
    return _id
      ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
      : await this.desafiosService.consultarDesafios()
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarDesafio(
    @Body(DesafioStatusValidaPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('_id') _id: string
  ): Promise<Desafio> {
    return await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto)
  }
}
