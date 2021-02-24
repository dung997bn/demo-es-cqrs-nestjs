import * as mongoose from "mongoose";
import { v4 } from 'uuid';

export const CqrsQuerySchema = new mongoose.Schema({
    _id: { type: String },
    id: { type: String, default: v4() },

    code: { type: String },
    name: { type: String },
    price: { type: Number },
    status: { type: String },
    description: { type: Number },
    image: { type: String },

    modifiedBy: String,
    createdDate: { type: Date, default: () => Date.now() },
    modifiedDate: { type: Date, default: () => Date.now() },
    eventName: { type: String },
    actionName: { type: String },
    revision: { type: Number, index: true },
});

CqrsQuerySchema.pre("save", function (next) {
    this._id = this.get("id");
    next();
});