import { Module } from '@nestjs/common'
import { JogadoresModule } from './jogadores/jogadores.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:vaHK1REOAKSi0kP1@cluster0.n53km.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
