import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProductPublisher } from "src/ms-publisher/product-publisher";
import { ProductCreatedEvent } from "../imp/product-created.event";
import * as clc from 'cli-color';
import { PRODUCT_CREATE_PATTERN } from "src/common/constants";

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler implements IEventHandler<ProductCreatedEvent>{

    constructor(
        private readonly publisher: ProductPublisher
    ) { }

    handle(event: ProductCreatedEvent) {
        console.log(clc.greenBright('ProductCreatedEvent...'));
        // send to microservice
        const data = event;
        console.log('Client send mesage to broker');
        this.publisher.publish(PRODUCT_CREATE_PATTERN, JSON.stringify(data));
    }
}