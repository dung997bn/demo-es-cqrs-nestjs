import * as mongoose from "mongoose"

export const CodegenerateSchema = new mongoose.Schema({
    name: { type: String, index: true },
    index: { type: Number, default: 0 },
    prefix: { type: String, required: true },
})