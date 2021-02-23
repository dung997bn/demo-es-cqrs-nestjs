import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CommonConst } from '../shared/constants';
import { IEventStreamDocument } from '../shared/eventStream/interfaces/event-stream-document.interface';

@Injectable()
export class ProductDomainService {
    constructor(
        @Inject(CommonConst.PRODUCT_DOMAIN_MODEL_TOKEN)
        private readonly productModel: Model<IEventStreamDocument>
    ) { }
}
