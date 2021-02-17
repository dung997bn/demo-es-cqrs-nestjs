import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { ProductViewRepository } from "src/products/view-repositories/product.event.repository";
import { ProductCreatedEvent } from "../imp/product-created.event";


@ViewUpdaterHandler(ProductCreatedEvent)
export class ProductCreatedUpdater implements IViewUpdater<ProductCreatedEvent>{
    constructor(
        private readonly repository: ProductViewRepository
    ) { }

    async handle(event: ProductCreatedEvent): Promise<void> {
        await this.repository.insertEvent(event)
    }
}