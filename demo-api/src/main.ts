import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from "@nestjs/platform-express";
import express = require('express');
import { ConfigsService } from './modules/configs/configs.service';
import * as clc from 'cli-color'
import { Transport } from '@nestjs/microservices';

const http = require('http');

const configService = new ConfigsService(`env.${process.env.NODE_ENV}`)
const port = configService.get("PORT");
const redisUrl = configService.get('REDIS_URL');

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('/api')
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
  http.createServer(server).listen(port, () => console.log(clc.cyanBright('Application is listening on port: ', port)));
}
bootstrap();
