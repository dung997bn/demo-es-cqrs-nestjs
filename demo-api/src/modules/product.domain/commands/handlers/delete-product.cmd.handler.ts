import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommonConst } from "src/modules/shared/constants";
import { IResult } from "src/modules/shared/interfaces";
import { DeleteProductCommand } from "../implements";

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler implements ICommandHandler<DeleteProductCommand> {
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME
    private readonly eventName: string = CommonConst.AGGREGATES.PRODUCT.DELETED
    private readonly result: IResult = {
        msg: "Delete Command Handler Excecuted.",
        err: null,
        data: null,
    }

    execute(command: DeleteProductCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }
}