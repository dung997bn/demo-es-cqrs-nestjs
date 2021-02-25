import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CommonConst } from "../../shared/constants";
import { ICodeGenerateDocument } from "../interfaces/document.interface";

@Injectable()
export class CodeGenerateRepository {
    private readonly NUMBER_PAD_START = 5;
    private readonly NUMBER_PAD_START_CHECK_IN = 6;

    constructor(
        @Inject(CommonConst.QUERY_MODEL_TOKEN)
        private readonly readModel: Model<ICodeGenerateDocument>
    ) { }

    async generateCode(name: string, prefix: string, start: number = 1) {
        return await this.readModel
            .findOneAndUpdate(
                { name: name, prefix: prefix },
                { $set: { prefix: prefix }, $inc: { index: 1 } },
                { upsert: true }
            )
            .then((rs) => {
                if (!rs) {
                    this.readModel.findOneAndUpdate(
                        { name: name, prefix: prefix },
                        { $set: { prefix: prefix, index: start } },
                        { upsert: true }
                    );
                    const stt = start.toString().padStart(this.NUMBER_PAD_START, "0");
                    return `${prefix}${stt}`;
                }
                if ((rs.index + 1).toString().length > this.NUMBER_PAD_START) {
                    return `${rs.prefix}${(rs.index + 1).toString()}`;
                }
                return `${rs.prefix}${(rs.index + 1)
                    .toString()
                    .padStart(this.NUMBER_PAD_START, "0")}`;
            })
            .catch((error) => {
                return "";
            });
    }

    generateCheckInCode() {
        const code = Math.floor(Math.random() * 1000000).toString().padStart(this.NUMBER_PAD_START_CHECK_IN, "0");
        return code
    }
}