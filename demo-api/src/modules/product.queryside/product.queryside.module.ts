import { CqrsQueryProviders } from './providers/cqrs.query.providers';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigsModule } from '../configs/configs.module';
import { QueryDatabaseModule } from '../databases/query/query.database.module';
import { ProductQuerySideController } from './product.queryside.controller';
import { ProductQuerySideService } from './product.queryside.service';
import { ProductQueryRepository } from './repositories/product.query.repository';
import { ProductQueryCommandHandlers } from './commands/handlers';
import { ProductQueryEventHandlers } from './events';

@Module({
  imports: [
    CqrsModule,
    QueryDatabaseModule,
    ConfigsModule
  ],
  controllers: [ProductQuerySideController],
  providers: [
    ProductQuerySideService,
    ProductQueryRepository,
    ...CqrsQueryProviders,
    ...ProductQueryCommandHandlers,
    ...ProductQueryEventHandlers

  ]
})
export class ProductQuerySideModule { }
