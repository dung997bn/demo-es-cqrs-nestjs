import { CreateProductCommandHandler } from "./create-product.cmd.handler";
import { DeleteProductCommandHandler } from "./delete-product.cmd.handler";
import { UpdateProductCommandHandler } from "./update-product.cmd.handler";

export const ProductDomainCommandHandlers = [
    CreateProductCommandHandler,
    UpdateProductCommandHandler,
    DeleteProductCommandHandler
]