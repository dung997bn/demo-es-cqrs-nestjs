import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigsModule } from '../configs/configs.module';
import { QueryDatabaseModule } from '../databases/query/query.database.module';
import { ProductQuerySideController } from './product.queryside.controller';

@Module({
  imports: [CqrsModule, QueryDatabaseModule, ConfigsModule],
  controllers: [ProductQuerySideController]
})
export class ProductQuerySideModule { }
