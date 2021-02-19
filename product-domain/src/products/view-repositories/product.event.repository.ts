import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductCreatedEvent } from "../events/imp/product-created.event";

import { ProductDocument } from "../schemas/product.schema";

export class ProductViewRepository {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductDocument>
    ) { }

    async insertEvent(event: ProductCreatedEvent): Promise<any> {
        const newProduct = { ...event }
        const result = await this.productModel.findOneAndUpdate({ _id: event.id }, newProduct, {
            new: true,
            upsert: true
        })
            .then(async (response) => {
                console.log(response);
                if (response)
                    return response
                else
                    return await this.productModel.create(newProduct)
            })

        return result.id as string
    }
}