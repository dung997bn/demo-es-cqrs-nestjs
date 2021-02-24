import { ProductQueryUpdatedEvent } from './product.query-updated.event';
import { ProductQueryDeletedEvent } from './product.query-deleted.event';
import { IEventHandler } from "@nestjs/cqrs";
import { ProductQueryCreatedEvent } from "./product.query-created.event";
import { ProductQueryRepository } from '../repositories/product.query.repository';
import * as clc from 'cli-color'

export class ProductQueryEventHandler implements IEventHandler<ProductQueryCreatedEvent>, IEventHandler<ProductQueryDeletedEvent>, IEventHandler<ProductQueryUpdatedEvent>{
    constructor(
        private readonly repository: ProductQueryRepository,
    ) { }

    handle(event: ProductQueryCreatedEvent | ProductQueryDeletedEvent | ProductQueryUpdatedEvent) {
        if (event && event instanceof ProductQueryCreatedEvent) {
            this.createdHandler(event.commandModel)
        } else if (event && event instanceof ProductQueryDeletedEvent) {
            this.deletedHandler(event)
        } else if (event && event instanceof ProductQueryUpdatedEvent) {
            this.updatedHandler(event.commandModel)
        }
    }

    private createdHandler(event: any) {
        console.log(clc.yellowBright("Async Product Created Query Event Handler..."))
        this.repository.create(event);
    }

    private updatedHandler(event: any) {
        console.log(clc.yellowBright("Async Product Updated Query Event Handler..."))
        this.repository.update(event);
    }

    private deletedHandler(event: any) {
        console.log(clc.yellowBright("Async Product Deleted Query Event Handler..."))
        this.repository.delete(event);
    }
}