import { ProductQueryRepository } from './../product.queryside/repositories/product.query.repository';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { BadRequestException, Injectable } from "@nestjs/common";
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
        private readonly codeGenerate: CodeGenerateService,
        private readonly queryRepository: ProductQueryRepository,

    ) { }

    async createProduct(dto: CreateProductDto) {
        console.log(clc.blueBright('Inside Creating Product Domain Service...'))
        const model: any = { ...dto };
        if (model.id) {
            delete model.id;
        }
        this.commandId = v4();
        model.modifiedBy = 'no one';
        model.createdBy = 'no one';
        await this.executeCommand(Action.CREATE, Action.CREATE, this.commandId, model);
        return { id: this.commandId, code: model.code };
    }

    async updateProduct(dto: UpdateProductDto) {
        console.log(clc.blueBright('Inside Updating Product Domain Service...'))
        const oldDto: any = await this.queryRepository.findOne({ id: dto.id });
        if (!oldDto) {
            throw new BadRequestException({ errors: "Not exist any products with that id: " + dto.id });
        }

        const model: any = { ...dto };
        this.commandId = v4();
        model.modifiedBy = 'no one';
        await this.executeCommand(Action.UPDATE, Action.UPDATE, this.commandId, model);
        return { id: this.commandId };
    }
    
    async deleteProduct(id: string) {
        console.log(clc.blueBright('Inside Deleting Product Domain Service...'))
        const oldDto: any = await this.queryRepository.findOne({ id: id });
        if (!oldDto) {
            throw new BadRequestException({ errors: "Not exist any products with that id: " + id });
        }

        const model: any = { id };
        this.commandId = v4();
        model.modifiedBy = 'no one';
        await this.executeCommand(Action.DELETE, Action.DELETE, this.commandId, model);
        return { id: this.commandId };
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
