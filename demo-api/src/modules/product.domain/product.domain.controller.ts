import { Body, Controller, Delete, Headers, Param, Post, Put } from '@nestjs/common';
import { Action } from '../shared/enums';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { ProductDomainService } from './product.domain.service';

@Controller('v1/product')
export class ProductDomainController {
    private actionName: string = Action.NOTIFY;
    constructor(
        private readonly productDomainService: ProductDomainService
    ) { }

    @Post()
    async createProduct(@Body() dto: CreateProductDto, @Headers("act") actionName?: string) {
        this.actionName = actionName || this.actionName;
        return await this.productDomainService.createProduct(dto, this.actionName)
    }

    @Put()
    async updateProduct(@Body() dto: UpdateProductDto, @Headers("act") actionName?: string) {
        this.actionName = actionName || this.actionName;
        return await this.productDomainService.updateProduct(dto, this.actionName)
    }

    @Delete()
    async deleteProduct(@Param() id: string, @Headers("act") actionName?: string) {
        this.actionName = actionName || this.actionName;
        return await this.productDomainService.deletProduct(id, this.actionName)
    }
}
