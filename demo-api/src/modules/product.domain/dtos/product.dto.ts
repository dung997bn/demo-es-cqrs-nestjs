import { IsNotEmpty, IsString } from "class-validator";
import { ClassBased } from "../../shared/classes/class-based";
import { IProduct } from "../../shared/interfaces/product/product.interface";

export class ProductDto extends ClassBased implements IProduct {
    id: string;
    description: string;
}

export class CreateProductDto extends ProductDto {
    @IsString()
    @IsNotEmpty()
    code: string
    name: string
    price: number
    status: string
    image: string
}

export class UpdateProductDto extends ProductDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    code: string
    name: string
    price: number
    status: string
    image: string
}