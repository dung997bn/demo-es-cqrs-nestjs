import { AggregateRoot } from "@nestjs/cqrs";
import { ProductDto } from "../dtos/product-dto";
import { ProductCreatedEvent } from "../events/imp/product-created.event";

export enum ProductState {
    InStock = 'inStock',
    OutStock = 'outStock',
    CommingSoon = 'commingSoon'
}

export class Product extends AggregateRoot {
    constructor(id: string) {
        super();
        this.id = id;
    }

    public readonly id: string
    public name: string
    public description: string
    public price: number
    public state: ProductState

    create(name: string, description: string, price: number, state: ProductState) {
        this.apply(new ProductCreatedEvent(this.id, name, description, price, state))
    }
}