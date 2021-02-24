import { CommandHandler, CommandHandlerNotFoundException, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CommonConst } from "src/modules/shared/constants";
import { ProductQueryRepository } from "../../repositories/product.query.repository";
import { UpdateProductQueryCommand } from "../implements";
import * as clc from 'cli-color'

@CommandHandler(UpdateProductQueryCommand)
export class UpdateProductQueryCommandHandler implements ICommandHandler<UpdateProductQueryCommand>{
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME;
    constructor(
        private readonly repository: ProductQueryRepository,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: UpdateProductQueryCommand) {
        clc.yellowBright(`Async Update query ${this.aggregateName} cmd ...`)
        const { id, commandModel } = command;
        const cmdPublisher = this.publisher.mergeObjectContext(
            await this.repository.findAggregateModelById(id)
        );
        cmdPublisher.updateProduct(commandModel)
        cmdPublisher.commit();
    }
}