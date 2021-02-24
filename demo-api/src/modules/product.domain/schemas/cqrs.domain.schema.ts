import * as mongoose from "mongoose";
import { v4 } from 'uuid';

export const payloadSchema = new mongoose.Schema({
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

payloadSchema.pre("save", function (next) {
    this._id = this.get("id");
    next();
});

export const CqrsDomainSchema = new mongoose.Schema({
    _id: { type: String },
    id: { type: String, index: true },
    streamId: { type: String, index: true },
    aggregate: String,
    aggregateId: String,
    context: String,
    streamRevision: Number,
    commitId: String,
    commitSequence: Number,
    commitStamp: { type: Date, default: () => Date.now() },
    eventName: { type: String },
    payload: { type: payloadSchema },
});

CqrsDomainSchema.pre("save", function (next) {
    this._id = this.get("id");
    next();
});