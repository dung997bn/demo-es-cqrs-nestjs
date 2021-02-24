import { IEvent } from "@nestjs/cqrs";
import { CommandModel } from "src/modules/shared/eventStream/models/command.model";

export class ProductQueryUpdatedEvent implements IEvent {
    constructor(public readonly commandModel: CommandModel) { }
}