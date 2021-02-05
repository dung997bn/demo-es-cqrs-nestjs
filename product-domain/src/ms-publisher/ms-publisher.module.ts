import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from 'src/common/common.module';
import { PRODUCT_QUEUE, PRODUCT_SERVICE } from 'src/common/constants';
import { ConfigsModule } from 'src/configs/configs.module';
import { ConfigsService } from 'src/configs/configs.service';
import { ProductPublisher } from './product-publisher';

const configService = new ConfigsService('.env.local');
const rabbitMqUrl = configService.get('RABBITMQ_URL');

@Module({
    imports: [
        ConfigsModule,
        CommonModule,
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
    providers: [ProductPublisher],
    exports: [ProductPublisher]
})

export class MsPublisherModule { }
