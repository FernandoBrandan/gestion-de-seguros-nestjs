import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/all-exceptions.filtert'
import { Logger, ValidationPipe } from '@nestjs/common'
import { EnvironmentsVariables } from './config/config'
import * as morgan from 'morgan'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule)
  app.use(morgan('dev'))

  // app.useGlobalFilters
  // app.useGlobalGuards
  // app.useGlobalInterceptors

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.enableCors()

  await app.listen(EnvironmentsVariables.PORT)
  logger.log(`Application running on http://localhost:${EnvironmentsVariables.PORT}`)
}
bootstrap()
