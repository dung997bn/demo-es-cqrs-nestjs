import { IEvent } from "@nestjs/cqrs";
import { BaseEventHandler } from "../../shared/eventStream/events/base-event-handler.model";
import { BaseEventStream } from "../../shared/eventStream/models/base-event-stream.model";
import { CommandModel } from "../../shared/eventStream/models/command.model";

export class ProductCreatedEvent extends BaseEventHandler implements IEvent {
    constructor(
        public readonly baseEventStream: BaseEventStream,
        public readonly commandModel: CommandModel,
        public readonly msg: string
    ) {
        super(baseEventStream, commandModel, msg);
    }
}