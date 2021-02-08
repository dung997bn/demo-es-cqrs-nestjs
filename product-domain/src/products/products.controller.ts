import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/imp/create-product.command';
import { ProductDto } from './dtos/product-dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }
    @Post()
    async createProduct(@Body() dto: ProductDto) {
        return this.commandBus.execute(new CreateProductCommand(dto))
    }

}
