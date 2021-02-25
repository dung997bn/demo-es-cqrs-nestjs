import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as dotenv from "dotenv";

@Injectable()
export class ConfigsService {
    constructor(filePath: string) {
        const path = join(__dirname, "..", "..", filePath)
        dotenv.config({ path: path })
    }

    get(key: string): string {
        return process.env[key]
    }

    public getTemplateFileDownload(fileName: string): any {
        return join(__dirname, "../../", "template-files", fileName);
    }

    public getUploadFolderPath(): any {
        return join(__dirname, "..", "..", "generated-files");
    }
}
