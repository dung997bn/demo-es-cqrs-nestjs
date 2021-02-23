import { Connection } from "mongoose";
import { CommonConst } from "../../shared/constants";
import { CqrsDomainSchema } from "../schemas/cqrs.domain.schema";

export const CqrsProviders = [
    {
        provide: CommonConst.PRODUCT_DOMAIN_MODEL_TOKEN,
        useFactory: (connection: Connection) => connection.model(CommonConst.PRODUCT_EVENTS, CqrsDomainSchema),
        inject: [CommonConst.DOMAIN_CONNECTION_TOKEN]
    }
]