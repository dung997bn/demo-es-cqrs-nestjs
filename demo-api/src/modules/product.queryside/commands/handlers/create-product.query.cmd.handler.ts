import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CommonConst } from "../../../shared/constants";
import { ProductQueryRepository } from "../../repositories/product.query.repository";
import { CreateProductQueryCommand } from "../implements";
import * as clc from 'cli-color'

@CommandHandler(CreateProductQueryCommand)
export class CreateProductQueryCommandHandler implements ICommandHandler<CreateProductQueryCommand>{
    private readonly aggregateName: string = CommonConst.PRODUCT_AGGREGATE_NAME;

    constructor(
        private readonly repository: ProductQueryRepository,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: CreateProductQueryCommand) {
        console.log(clc.yellowBright(`Async Create Query ${this.aggregateName} Command...`))
        const { id, commandModel } = command;
        const cmdPublisher = this.publisher.mergeObjectContext(
            await this.repository.findAggregateModelById(id)
        );
        cmdPublisher.addProduct(commandModel)
        cmdPublisher.commit();
    }
}