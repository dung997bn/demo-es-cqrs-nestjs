import { CodeGenerateProvider } from './providers/code-generate.providers';
import { QueryDatabaseModule } from './../databases/query/query.database.module';
import { Module } from '@nestjs/common';
import { CodeGenerateService } from './code-generate.service';
import { CodeGenerateRepository } from './repository/code-generate.repository';

@Module({
  imports: [QueryDatabaseModule],
  providers: [
    CodeGenerateService,
    CodeGenerateRepository,
    ...CodeGenerateProvider
  ],
  exports: [CodeGenerateRepository, CodeGenerateModule, CodeGenerateService],
})
export class CodeGenerateModule { }
