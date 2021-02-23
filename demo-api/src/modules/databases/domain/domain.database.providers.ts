
import * as mongoose from "mongoose";
import { ConfigsService } from "../../configs/configs.service";
import { CommonConst } from "../../shared/constants";

const Mongoose = mongoose.Mongoose;
const instance = new Mongoose();
const configService = new ConfigsService(`env.${process.env.NODE_ENV}`)
const mongoUrl = configService.get("MONGODB_URL_EVENT_STORE");

export const domainDatabaseProvider = [
    {
        provide: CommonConst.DOMAIN_CONNECTION_TOKEN,
        useFactory: async (): Promise<any> => {
            (instance as any).Promise = global.Promise
            instance.set("useCreateIndex", true);
            return await instance.connect(mongoUrl)
        }
    }
]