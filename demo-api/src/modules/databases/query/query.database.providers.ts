import * as mongoose from "mongoose";
import { ConfigsService } from "../../configs/configs.service";
import { CommonConst } from "../../shared/constants";

const Mongoose = mongoose.Mongoose;
const instance = new Mongoose();
const configService = new ConfigsService(`env.${process.env.NODE_ENV}`)
const mongoUrl = configService.get("MONGODB_URL_QUERY");

export const queryDatabaseProvider = [
    {
        provide: CommonConst.QUERY_CONNECTION_TOKEN,
        useFactory: async (): Promise<typeof mongoose> => {
            (instance as any).Promise = global.Promise
            instance.set("useCreateIndex", true);
            return await instance.connect(mongoUrl, { useNewUrlParser: true }, (err) => {
                if (err) {
                    console.log("Has error connect db", err);
                    throw err;
                }
            })
        }
    }
]