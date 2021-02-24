import { Module } from '@nestjs/common';
import { ConfigsModule } from './modules/configs/configs.module';
import { ProductDomainModule } from './modules/product.domain/product.domain.module';
import { ProductQuerySideModule } from './modules/product.queryside/product.queryside.module';
import { CodeGenerateModule } from './modules/code-generate/code-generate.module';

@Module({
  imports: [ProductDomainModule, ProductQuerySideModule, ConfigsModule, CodeGenerateModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
