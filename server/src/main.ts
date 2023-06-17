import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log('Server start on port: 3000')
  await app.listen(3000);
}
bootstrap();
