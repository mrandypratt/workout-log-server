import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5000;

async function bootstrap() {
  const logger = new Logger("BootStrap")
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
  logger.log(`Listening on PORT ${PORT}`);
}
bootstrap();
