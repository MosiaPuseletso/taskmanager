import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as fastifyCors from 'fastify-cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.register(fastifyCors, {
    origin: true
  });
  await app.listen(process.env.PORT || 5000);
}
bootstrap(); 