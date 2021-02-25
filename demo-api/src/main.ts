import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from "@nestjs/platform-express";
import express = require('express');
import { ConfigsService } from './modules/configs/configs.service';

const configService = new ConfigsService(`env.${process.env.NODE_ENV}`)
const port = configService.get("PORT");
import * as clc from 'cli-color'

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('/api')
  await app.listen(port).then(() => console.log(clc.cyanBright(`Server is listening at port ${port}`)))
}
bootstrap();
