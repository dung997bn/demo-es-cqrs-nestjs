import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigsService } from './configs/configs.service';
import { CommonConst } from './shared/constant';
import express = require('express');
const configService = new ConfigsService(`env.${process.env.NODE_ENV}`)
const port = configService.get("PORT");
const redisUrl = configService.get('REDIS_URL');
const http = require('http');

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.connectMicroservice(
    {
      transport: Transport.REDIS,
      options: {
        urls: redisUrl
      }
    },
  )
  await app.startAllMicroservicesAsync()
  await app.init()
  http.createServer(server).listen(port, () => console.log('Application is listening on port: ', port))
}
bootstrap();
