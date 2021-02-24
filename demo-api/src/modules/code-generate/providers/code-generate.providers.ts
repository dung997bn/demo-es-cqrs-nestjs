import { Connection } from "mongoose";
import { CommonConst } from "src/modules/shared/constants";
import { CodegenerateSchema } from "../schemas/code-generate.schema";

export const CodeGenerateProvider = [
    {
        provide: CommonConst.QUERY_MODEL_TOKEN,
        useFactory: (connection: Connection) =>
            connection.model(CommonConst.CODE_GENERATE_COLLECTION, CodegenerateSchema),
        inject: [CommonConst.QUERY_CONNECTION_TOKEN],
    }
]