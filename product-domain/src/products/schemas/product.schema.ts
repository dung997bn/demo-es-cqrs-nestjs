import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ProductState } from "../models/product.model";

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop()
    _id: string;

    @Prop()
    public name: string

    @Prop()
    public description: string

    @Prop()
    public price: number

    @Prop()
    public state: ProductState
}


export const ProductViewSchema = SchemaFactory.createForClass(Product);