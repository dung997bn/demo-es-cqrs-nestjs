import { Module } from '@nestjs/common';
import { UuIdGenerator } from './uuid-generator';

@Module({
    providers: [UuIdGenerator],
    exports: [UuIdGenerator]
})
export class CommonModule { }
