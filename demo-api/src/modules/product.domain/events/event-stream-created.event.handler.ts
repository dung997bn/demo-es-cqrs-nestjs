import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProductEventRepository } from "../repositories/product.event.repository";
import { ProductCreatedEvent } from "./event-stream-created.event";
import * as clc from 'cli-color';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler implements IEventHandler<ProductCreatedEvent> {
    constructor(
        private readonly repository: ProductEventRepository
    ) { }

    async handle(event: ProductCreatedEvent) {
        console.log(clc.blueBright('Inside Creating Product Event...'));
        return this.repository.createEvent(event).then((response) => response).catch((error) => error)
    }
}