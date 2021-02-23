import { Module } from '@nestjs/common';
import { ConfigsModule } from '../../configs/configs.module';
import { domainDatabaseProvider } from './domain.database.providers';

@Module({
    imports: [ConfigsModule],
    providers: [...domainDatabaseProvider],
    exports: [...domainDatabaseProvider],

})
export class DomainDatabaseModule { }
