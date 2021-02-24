import { IEvent } from "@nestjs/cqrs";

export class ProductQueryDeletedEvent implements IEvent {
    constructor(public readonly id: string) { }
}