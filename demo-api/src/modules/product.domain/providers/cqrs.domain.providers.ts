import { Connection } from "mongoose";
import { CommonConst } from "../../shared/constants";
import { CqrsDomainSchema } from "../schemas/cqrs.domain.schema";

export const CqrsDomainProviders = [
    {
        provide: CommonConst.PRODUCT_DOMAIN_MODEL_TOKEN,
        useFactory: (connection: Connection) => connection.model(CommonConst.PRODUCT_EVENTS_DOMAIN, CqrsDomainSchema),
        inject: [CommonConst.DOMAIN_CONNECTION_TOKEN]
    }
]