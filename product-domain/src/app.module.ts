import { DynamicModule, Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigsModule } from './configs/configs.module';
import { CommonModule } from './common/common.module';
import { MsPublisherModule } from './ms-publisher/ms-publisher.module';
import { ConfigsService } from './configs/configs.service';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [ProductsModule, ConfigsModule, CommonModule, MsPublisherModule],
//   providers: [AppService],
// })

const configService = new ConfigsService('.env.local');
const eventStoreMongodbUrl = configService.get('MONGODB_URL_EVENT_STORE');

export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        ProductsModule,
        ConfigsModule,
        CommonModule,
        MsPublisherModule,
        EventSourcingModule.forRoot({ mongoURL: eventStoreMongodbUrl }),
        MongooseModule.forRootAsync({
          imports: [ConfigsModule],
          useFactory: async (configService: ConfigsService) => ({
            uri: configService.get('MONGODB_URL_QUERY')
          }),
          inject: [ConfigsService]
        })
      ],
    }
  }
}
