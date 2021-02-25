import { AggregateRoot } from "@nestjs/cqrs";
import { BaseEventStream } from "../../shared/eventStream/models/base-event-stream.model";
import { CommandModel } from "../../shared/eventStream/models/command.model";
import { ProductCreatedEvent } from "../events/event-stream-created.event";

export class ProductDomainAggregateModel extends AggregateRoot {
    constructor(private readonly baseEventStream: BaseEventStream) {
        super();
    }

    addProduct(messagePattern: string, commandModel?: CommandModel) {
        this.apply(new ProductCreatedEvent(this.baseEventStream, commandModel, messagePattern))
    }
}