import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CommonConst } from "src/modules/shared/constants";
import { ProductQueryRepository } from "../../repositories/product.query.repository";
import { DeleteProductQueryCommand } from "../implements";
import * as clc from 'cli-color'

@CommandHandler(DeleteProductQueryCommand)
export class DeleteProductQueryCommandHandler implements ICommandHandler<DeleteProductQueryCommand>{
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME;
    constructor(
        private readonly repository: ProductQueryRepository,
        private readonly publisher: EventPublisher,
    ) { }
    async execute(command: DeleteProductQueryCommand) {
        clc.yellowBright(`Async Detele query ${this.aggregateName} cmd ...`)
        const { id, commandModel } = command;
        const cmdPublisher = this.publisher.mergeObjectContext(
            await this.repository.findAggregateModelById(commandModel.id)
        );
        cmdPublisher.deleteProduct(commandModel.id)
        cmdPublisher.commit();
    }
}