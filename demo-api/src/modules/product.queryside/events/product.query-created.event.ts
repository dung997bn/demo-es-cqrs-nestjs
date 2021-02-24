import { IEvent } from "@nestjs/cqrs";
import { CommandModel } from "src/modules/shared/eventStream/models/command.model";

export class ProductQueryCreatedEvent implements IEvent {
    constructor(public readonly commandModel: CommandModel) { }
}
