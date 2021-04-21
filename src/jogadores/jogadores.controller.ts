import { JogadoresService } from './jogadores.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criarJogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { ValidacaoParametrosPipe } from '../commons/pipes/validacao-parametros.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadorService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<Jogador> {
    return await this.jogadorService.criarJogador(criarJogadorDto)
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', ValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    await this.jogadorService.atualizarJogador(_id, atualizarJogadorDto)
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadorService.consultarTodosJogadores()
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', ValidacaoParametrosPipe) _id: string
  ): Promise<Jogador> {
    return await this.jogadorService.consultarPeloId(_id)
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', ValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    return await this.jogadorService.deletarJogador(_id)
  }
}
