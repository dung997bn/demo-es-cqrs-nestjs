import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisListenerModule } from './redis-listener/redis-listener.module';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [RedisListenerModule, ConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
