import { Payload } from './../models/payload.model';
import { Document } from "mongoose";

export interface IEventStreamDocument extends Document {
    id: string;
    streamId: string;
    aggregate: string;
    aggregateId: string;
    context: string;
    streamRevision: number;
    commitId: string;
    commitSequence: number;

    payload: Payload;
}