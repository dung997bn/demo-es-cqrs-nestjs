import { Injectable } from '@nestjs/common';
import { CodeGenerateRepository } from './repository/code-generate.repository';

@Injectable()
export class CodeGenerateService {
    constructor(private readonly repository: CodeGenerateRepository) { }

    async generateCode(name, prefix: string) {
        return await this.repository.generateCode(name, prefix);
    }
    
    generateCheckInCode() {
        return this.repository.generateCheckInCode()
    }
}
