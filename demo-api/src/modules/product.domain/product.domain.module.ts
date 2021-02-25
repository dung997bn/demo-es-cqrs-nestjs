import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CodeGenerateModule } from '../code-generate/code-generate.module';
import { ConfigsModule } from '../configs/configs.module';
import { DomainDatabaseModule } from '../databases/domain/domain.database.module';
import { ProductQuerySideModule } from '../product.queryside/product.queryside.module';
import { ProductDomainCommandHandlers } from './commands/handlers';
import { ProductDomainEventHandlers } from './events';
import { ProductDomainController } from './product.domain.controller';
import { ProductDomainService } from './product.domain.service';
import { CqrsDomainProviders } from './providers/cqrs.domain.providers';
import { ProductEventRepository } from './repositories/product.event.repository';
import { ProductDomainSagas } from './sagas/product.domain.sagas';

@Module({
  imports: [
    CqrsModule,
    DomainDatabaseModule,
    ConfigsModule,
    CodeGenerateModule,
    ProductQuerySideModule
  ],
  providers: [
    ProductDomainSagas,
    ProductEventRepository,
    ProductDomainService,
    ...CqrsDomainProviders,
    ...ProductDomainCommandHandlers,
    ...ProductDomainEventHandlers
  ],
  controllers: [ProductDomainController]
})
export class ProductDomainModule { }