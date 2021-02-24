import { IEvent } from "@nestjs/cqrs";
import { BaseEventHandler } from "src/modules/shared/eventStream/events/base-event-handler.model";
import { BaseEventStream } from "src/modules/shared/eventStream/models/base-event-stream.model";
import { CommandModel } from "src/modules/shared/eventStream/models/command.model";

export class ProductCreatedEvent extends BaseEventHandler implements IEvent {
    constructor(
        public readonly baseEventStream: BaseEventStream,
        public readonly commandModel: CommandModel,
        public readonly msg: string
    ) {
        super(baseEventStream, commandModel, msg);
    }
}