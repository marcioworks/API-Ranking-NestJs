import { JogadoresModule } from './../jogadores/jogadores.module'
import { DesafioSchema } from './interfaces/desafio.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DesafiosController } from './desafios.controller'
import { DesafiosService } from './desafios.service'
import { CategoriasModule } from 'src/categorias/categorias.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema }]),
    JogadoresModule,
    CategoriasModule
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
