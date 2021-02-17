import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ConfigsService } from 'src/config/configs.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_QUEUE, PRODUCT_SERVICE } from 'src/common/constants';
import { ProductClient } from './product-client';

const configService = new ConfigsService('.env.local');
const rabbitMqUrl = configService.get('RABBITMQ_URL');

@Module({
    imports: [
        ConfigModule,
        ClientsModule.register([
            {
                name: PRODUCT_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [rabbitMqUrl],
                    queue: PRODUCT_QUEUE,
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ])
    ],
    providers: [ProductClient],
    exports: [ProductClient]
})
export class MicroserviceClientModule { }
