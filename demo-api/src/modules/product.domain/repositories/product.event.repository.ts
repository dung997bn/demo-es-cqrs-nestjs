import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { CommonConst } from "../../shared/constants";
import { IEventStreamDocument } from "../../shared/eventStream/interfaces/event-stream-document.interface";
import { BaseEventStream } from "../../shared/eventStream/models/base-event-stream.model";
import { ProductCreatedEvent } from "../events/event-stream-created.event";
import * as clc from 'cli-color';

export class ProductEventRepository {
    constructor(
        @Inject(CommonConst.PRODUCT_DOMAIN_MODEL_TOKEN)
        private readonly model: Model<IEventStreamDocument>
    ) { }

    async createEvent(eventModel: ProductCreatedEvent): Promise<any> {
        console.log(clc.blueBright('Inside Creating Product Repository...'));
        const baseEventStream = eventModel.baseEventStream;
        const payload = eventModel.commandModel;
        const msg = eventModel.msg;

        baseEventStream.payload = payload;
        baseEventStream.returnMessagePattern = msg;
        return await this.findEventStreamById(baseEventStream.streamId).then((response) => {
            if (response) {
                baseEventStream.streamId = response.streamId;
            }
            return this.createEventStream(baseEventStream);
        })
    }

    async findEventStreamById(streamId: string) {
        return await this.model.findOne({ streamId }).sort({ commitStamp: -1 }).limit(1);
    }

    private async createEventStream(baseEventStream: BaseEventStream) {
        return await this.model.create(baseEventStream);
    }
}