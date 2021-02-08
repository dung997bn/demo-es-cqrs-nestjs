import { ProductState } from "../models/product.model";

export interface ProductDto {
    name: string
    description: string
    price: number
    state: ProductState
}