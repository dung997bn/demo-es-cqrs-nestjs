import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { CommonModule } from 'src/common/common.module';
import { MsPublisherModule } from 'src/ms-publisher/ms-publisher.module';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { StateUpdaters } from './events/updaters';
import { Product } from './models/product.model';
import { ProductsController } from './products.controller';
import { ProductViewSchema } from './schemas/product.schema';
import { ProductViewRepository } from './view-repositories/product.event.repository';

@Module({
  imports: [
    CqrsModule,
    EventSourcingModule.forFeature(),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductViewSchema }]),
    CommonModule,
    MsPublisherModule
  ],
  providers: [
    ProductViewRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...StateUpdaters
  ],
  controllers: [ProductsController]
})
export class ProductsModule { }
