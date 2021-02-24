import { Document } from "mongoose";
import { IProduct } from "src/modules/shared/interfaces/product/product.interface";

export interface IProductDocument extends Document, IProduct {
    id: string;
    description: string;
}