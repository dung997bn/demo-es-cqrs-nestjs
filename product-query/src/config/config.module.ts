import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';

@Module({
    providers: [
        ConfigsService,
        {
            provide: ConfigsService,
            useValue: new ConfigsService('.env.local')
        }
    ],
    exports: [ConfigsService]
})
export class ConfigModule { }
