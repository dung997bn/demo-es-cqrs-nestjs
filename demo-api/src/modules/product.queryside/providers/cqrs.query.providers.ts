import { Connection } from "mongoose";
import { CommonConst } from "src/modules/shared/constants";
import { CqrsQuerySchema } from "../schemas/cqrs.query.schema";

export const CqrsQueryProviders = [
    {
        provide: CommonConst.PRODUCT_QUERY_MODEL_TOKEN,
        useFactory: (connection: Connection) => connection.model(CommonConst.PRODUCT_COLLECTION_QUERY, CqrsQuerySchema),
        inject: [CommonConst.QUERY_CONNECTION_TOKEN]
    }
]