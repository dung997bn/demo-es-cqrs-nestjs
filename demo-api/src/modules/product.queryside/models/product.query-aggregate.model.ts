import { AggregateRoot } from "@nestjs/cqrs";
import { CommandModel } from "src/modules/shared/eventStream/models/command.model";
import { ProductQueryCreatedEvent } from "../events/product.query-created.event";
import { ProductQueryDeletedEvent } from "../events/product.query-deleted.event";
import { ProductQueryUpdatedEvent } from "../events/product.query-updated.event";

export class ProductQueryAggregateModel extends AggregateRoot {
    constructor(private readonly id: string) {
        super();
    }

    addProduct(commandModel: CommandModel) {
        this.apply(new ProductQueryCreatedEvent(commandModel))
    }

    updateProduct(commandModel: CommandModel) {
        this.apply(new ProductQueryUpdatedEvent(commandModel))
    }

    deleteProduct(id: string) {
        this.apply(new ProductQueryDeletedEvent(id))
    }
}