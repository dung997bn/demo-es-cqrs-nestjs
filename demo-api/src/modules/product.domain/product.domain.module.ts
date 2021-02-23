import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsModule } from '../configs/configs.module';
import { DomainDatabaseModule } from '../databases/domain/domain.database.module';
import { ProductDomainController } from './product.domain.controller';
import { ProductDomainService } from './product.domain.service';
import { CqrsProviders } from './providers/cqrs.domain.providers';

@Module({
  imports: [
    CqrsModule,
    DomainDatabaseModule,
    ConfigsModule
  ],
  providers: [
    ProductDomainService,
    ...CqrsProviders
  ],
  controllers: [ProductDomainController]
})
export class ProductDomainModule { }