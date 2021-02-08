import { ProductDto } from "src/products/dtos/product-dto";

export class CreateProductCommand {
    constructor(
        public dto: ProductDto
    ) { }
}
