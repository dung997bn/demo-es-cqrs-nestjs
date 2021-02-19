import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { UuIdGenerator } from "src/common/uuid-generator";
import { CreateProductCommand } from "../imp/create-product.command";
import * as clc from 'cli-color';
import { Product } from "src/products/models/product.model";

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand>{

    constructor(
        private readonly uuid: UuIdGenerator,
        private readonly sePublisher: StoreEventPublisher
    ) { }

    async execute(command: CreateProductCommand) {
        console.log(clc.greenBright('Create Product Command...'));
        const id = this.uuid.generate()
        const product = this.sePublisher.mergeObjectContext(new Product(id))
        product.create(command.dto.name, command.dto.description, command.dto.price, command.dto.state)
        product.commit()
    }
}