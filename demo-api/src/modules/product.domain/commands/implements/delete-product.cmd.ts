import { ICommand } from "@nestjs/cqrs";
import { CommandModel } from "src/modules/shared/eventStream/models/command.model";

export class DeleteProductCommand implements ICommand {
    constructor(
        public readonly messagePattern: string,
        public readonly id: string,
        public readonly commandModel: CommandModel
    ) { }
}