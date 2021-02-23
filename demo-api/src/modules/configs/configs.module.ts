import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';

@Module({
  providers: [
    {
      provide: ConfigsService,
      useValue: new ConfigsService(`.env.${process.env.NODE_ENV}`)
    }
  ],
  exports: [ConfigsService, ConfigsModule]
})
export class ConfigsModule { }
