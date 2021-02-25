import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CommonConst } from "../../shared/constants";
import { IProductDocument } from "../interfaces/document.interface";
import { ProductQueryAggregateModel } from "../models/product.query-aggregate.model";
import * as clc from 'cli-color'
@Injectable()
export class ProductQueryRepository {
    constructor(
        @Inject(CommonConst.PRODUCT_QUERY_MODEL_TOKEN)
        private readonly readModel: Model<IProductDocument>
    ) { }

    async findAggregateModelById(id: string): Promise<ProductQueryAggregateModel> {
        return new ProductQueryAggregateModel(id)
    }

    async findOne(query, projection = {}): Promise<IProductDocument> {
        return await this.readModel.findOne(query, projection);
    }

    async countAll(query: any) {
        delete query.isPaging;
        delete query.page;
        delete query.pageSize;
        return await this.readModel.countDocuments(query);
    }

    async find(query, projection = {}): Promise<IProductDocument[]> {
        return await this.readModel.find(query, projection);
    }

    async create(readmodel: any): Promise<IProductDocument> {
        console.log(clc.yellowBright("Inside Creating Product Query Repository..."))
        return await this.readModel.create(readmodel).then((response) => response).catch((error) => error);
    }

    async update(model: any): Promise<IProductDocument> {
        console.log(clc.yellowBright("Inside Updating Product Query Repository..."))
        return await this.readModel.updateOne({ id: model.id }, model).then((response) => response).catch((error) => error)
    }

    async delete(model: any): Promise<any> {
        console.log(clc.yellowBright("Inside Deleting Product Query Repository..."))
        return await this.readModel.deleteOne({ id: model.id }).then((response) => response).catch((error) => error)
    }
}