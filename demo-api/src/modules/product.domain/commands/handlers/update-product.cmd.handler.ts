import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommonConst } from "src/modules/shared/constants";
import { IResult } from "src/modules/shared/interfaces";
import { UpdateProductCommand } from "../implements";

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler implements ICommandHandler<UpdateProductCommand> {
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME
    private readonly eventName: string = CommonConst.AGGREGATES.PRODUCT.UPDATED
    private readonly result: IResult = {
        msg: "Update Command Handler Excecuted.",
        err: null,
        data: null,
    }
    execute(command: UpdateProductCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }
}