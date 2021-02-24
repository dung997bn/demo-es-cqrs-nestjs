import { CreateProductQueryCommandHandler } from "./create-product.query.cmd.handler";
import { DeleteProductQueryCommandHandler } from "./delete-product.query.cmd.handler";
import { UpdateProductQueryCommandHandler } from "./update-product.query.cmd.handler";

export const ProductQueryCommandHandlers = [
    CreateProductQueryCommandHandler,
    DeleteProductQueryCommandHandler,
    UpdateProductQueryCommandHandler
]