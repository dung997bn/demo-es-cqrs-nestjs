import { StorableEvent } from "event-sourcing-nestjs";
import { ProductDto } from "src/products/dtos/product-dto";

export class ProductCreatedEvent extends StorableEvent {
    eventAggregate= 'product';
    eventVersion= 1;

    constructor(
        public readonly id: string,
        public dto: ProductDto,
    ) {
        super()
    }
    eventName='product-event';
}