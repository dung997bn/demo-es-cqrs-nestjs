import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigsModule } from '../configs/configs.module';
import { CommonConst } from '../shared/constant';
import { ConfigsService } from '../configs/configs.service';

const configService = new ConfigsService('.env.local');
const redisUrl = configService.get('REDIS_URL');

@Module({
    imports: [
        ConfigsModule,
        ClientsModule.register([
            {
                name: CommonConst.PRODUCT_REDIS_SERVICE,
                transport: Transport.REDIS,
                options: {
                    url: redisUrl
                }
            }
        ])
    ]
})
export class RedisListenerModule { }
