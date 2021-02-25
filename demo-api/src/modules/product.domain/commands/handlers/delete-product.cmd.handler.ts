import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CommonConst } from "../../../shared/constants";
import { IResult } from "src/modules/shared/interfaces";
import { DeleteProductCommand } from "../implements";
import { ProductEventRepository } from "../../repositories/product.event.repository";
import * as clc from 'cli-color'
import { BaseEventStream } from "../../../shared/eventStream/models/base-event-stream.model";
import { ProductDomainAggregateModel } from "../../models/product.domain-aggregate.model";

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler implements ICommandHandler<DeleteProductCommand> {
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME
    private readonly eventName: string = CommonConst.AGGREGATES.PRODUCT.DELETED
    private readonly result: IResult = {
        msg: "Delete Command Handler Excecuted.",
        err: null,
        data: null,
    }

    constructor(
        private readonly publisher: EventPublisher,
        private readonly eventRepository: ProductEventRepository
    ) { }

    async execute(command: DeleteProductCommand) {
        console.log(clc.blueBright('Inside Deleting Product Domain Command Handler...'))

        const { messagePattern, id, commandModel } = command
        const eventSource = await this.eventRepository.findEventStreamById(commandModel.id);

        if (eventSource && eventSource.payload) {
            const payload: any = eventSource.payload;
            if (payload) {
                commandModel.id = eventSource.streamId;
                commandModel.modifiedBy = commandModel.modifiedBy || payload.modifiedBy;
            }
        }

        const eventStream = new BaseEventStream()
        eventStream.id = id
        eventStream.aggregateId = id

        if (!commandModel.id) {
            commandModel.id = id
        }

        eventStream.streamId = commandModel.id
        eventStream.aggregate = this.aggregateName
        eventStream.eventName = this.eventName

        commandModel.eventName = this.eventName
        commandModel.actionName = messagePattern

        const aggregateModel = new ProductDomainAggregateModel(eventStream)

        //pulisher
        const cmdPublisher = this.publisher.mergeObjectContext(aggregateModel)
        const msg = `${this.aggregateName}`
        cmdPublisher.addProduct(msg, commandModel)
        cmdPublisher.commit()
    }
}