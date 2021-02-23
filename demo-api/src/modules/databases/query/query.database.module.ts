import { Module } from '@nestjs/common';
import { ConfigsModule } from '../../configs/configs.module';
import { queryDatabaseProvider } from './query.database.providers';

@Module({
    imports: [ConfigsModule],
    providers: [...queryDatabaseProvider],
    exports: [...queryDatabaseProvider],

})
export class QueryDatabaseModule { }
