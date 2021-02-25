import { Body, Controller, Delete, Headers, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { ProductDomainService } from './product.domain.service';

@Controller('v1/product')
export class ProductDomainController {
    constructor(
        private readonly productDomainService: ProductDomainService
    ) { }

    @Post()
    async createProduct(@Body() dto: CreateProductDto) {
        return await this.productDomainService.createProduct(dto)
    }

    @Put()
    async updateProduct(@Body() dto: UpdateProductDto) {
        return await this.productDomainService.updateProduct(dto)
    }

    @Delete(":id")
    async deleteProduct(@Param("id") id: string) {
        return await this.productDomainService.deleteProduct(id)
    }
}
