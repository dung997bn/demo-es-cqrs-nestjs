import { Module } from '@nestjs/common';
import { ConfigsModule } from './modules/configs/configs.module';
import { ProductDomainModule } from './modules/product.domain/product.domain.module';
import { ProductQuerySideModule } from './modules/product.queryside/product.queryside.module';

@Module({
  imports: [ProductDomainModule, ProductQuerySideModule, ConfigsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
