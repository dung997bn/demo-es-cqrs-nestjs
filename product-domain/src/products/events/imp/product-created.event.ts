import { StorableEvent } from "event-sourcing-nestjs";
import { ProductState } from "src/products/models/product.model";

export class ProductCreatedEvent extends StorableEvent {
    eventAggregate: 'product';
    eventVersion: 1;

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly state: ProductState,
    ) {
        super();
    }
}