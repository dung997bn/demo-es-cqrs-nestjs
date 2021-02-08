import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { CommonModule } from 'src/common/common.module';
import { MsPublisherModule } from 'src/ms-publisher/ms-publisher.module';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    CqrsModule,
    EventSourcingModule.forFeature(),
    CommonModule,
    MsPublisherModule
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers
  ],
  controllers: [ProductsController]
})
export class ProductsModule { }
