import { AggregateRoot } from "@nestjs/cqrs";

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
}