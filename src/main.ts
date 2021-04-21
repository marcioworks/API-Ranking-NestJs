import { AllExceptionFilters } from './commons/filters/http-exception.filter'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new AllExceptionFilters())
  await app.listen(3000)
}
bootstrap()
