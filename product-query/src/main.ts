import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { PRODUCT_QUEUE } from './common/constants';
import { ConfigsService } from './config/configs.service';

const configService = new ConfigsService('.env.local');
const rabbitMqUrl = configService.get('RABBITMQ_URL');
const appPort = configService.get('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot())
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: PRODUCT_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  });
  await app.startAllMicroservicesAsync()
  await app.listen(appPort);
}
bootstrap();
