import { CommonConst } from './../../../shared/constants'
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs"
import { BaseEventStream } from "./../../../shared/eventStream/models/base-event-stream.model"
import { IResult } from "./../../../shared/interfaces/result.interface"
import { CreateProductCommand } from "../implements/create-product.cmd"
import { ProductDomainAggregateModel } from '../../models/product.domain-aggregate.model'
import * as clc from 'cli-color'

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME
    private readonly eventName: string = CommonConst.AGGREGATES.PRODUCT.CREATED
    private readonly result: IResult = {
        msg: "Create Command Handler Excecuted.",
        err: null,
        data: null,
    }
    constructor(
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: CreateProductCommand) {
        console.log(clc.blueBright('Inside Creating Product Domain Command...'))
        const { messagePattern, id, commandModel } = command
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