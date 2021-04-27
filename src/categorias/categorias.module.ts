import { JogadoresModule } from './../jogadores/jogadores.module'
import { CategoriaSchema } from './interfaces/categoria.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriasController } from './categorias.controller'
import { CategoriasService } from './categorias.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    JogadoresModule
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService]
})
export class CategoriasModule {}
