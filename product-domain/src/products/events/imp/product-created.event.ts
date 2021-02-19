import { StorableEvent } from "event-sourcing-nestjs";
import { ProductDto } from "src/products/dtos/product-dto";
import { ProductState } from "src/products/models/product.model";

export class ProductCreatedEvent extends StorableEvent {
    eventAggregate = 'product';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
        public price: number,
        public state: ProductState
    ) {
        super()
    }
    eventName = 'product-event';
}