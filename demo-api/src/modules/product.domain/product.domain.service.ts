import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { v4 } from 'uuid';
import { CodeGenerateService } from "../code-generate/code-generate.service";
import * as clc from 'cli-color'
import { Action } from '../shared/enums';
import { CreateProductCommand, DeleteProductCommand, UpdateProductCommand } from './commands/implements';

@Injectable()
export class ProductDomainService {
    private commandId: string;
    constructor(
        private readonly commandBus: CommandBus,
        private readonly codeGenerate: CodeGenerateService
    ) { }

    async createProduct(dto: CreateProductDto, actionName: string) {
        console.log(clc.blueBright('Create Product Command...'))
        const model: any = { ...dto };
        if (model.id) {
            delete model.id;
        }
        this.commandId = v4();
        model.modifiedBy = 'no one';
        model.createdBy = 'no one';
        await this.executeCommand(Action.CREATE, actionName, this.commandId, model);
        return { id: this.commandId, code: model.code };
    }

    async updateProduct(dto: UpdateProductDto, actionName: string) {

    }
    async deletProduct(id: string, actionName: string) {

    }

    private async executeCommand(action: string, actionName: string, commandId: string, model: any) {
        let commandObject = null;
        switch (action) {
            case Action.CREATE:
                commandObject = new CreateProductCommand(actionName, commandId, model);
                break;
            case Action.UPDATE:
                commandObject = new UpdateProductCommand(actionName, commandId, model);
                break;
            case Action.DELETE:
                commandObject = new DeleteProductCommand(actionName, commandId, model);
                break;
            default:
                break;
        }
        return await this.commandBus.execute(commandObject).then((response) => response).catch((error) => error);
    }
}
