import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductQuerySideService } from './product.queryside.service';

@Controller('v1/product')
export class ProductQuerySideController {
    constructor(
        private queryService: ProductQuerySideService
    ) { }
    // @Get()
    // findAll( @Query() query: any) {
    //     return this.queryService.findAll(query, user);
    // }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.queryService.findById(id);
    }
}
