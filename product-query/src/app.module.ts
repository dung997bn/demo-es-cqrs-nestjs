import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroserviceClientModule } from './microservice-client/microservice-client.module';
import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { CqrsModule } from '@nestjs/cqrs';

export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        CqrsModule,
        MicroserviceClientModule,
        ConfigModule,
        CommonModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }
  }
}
