import { Injectable } from "@nestjs/common";
import { v4 } from 'uuid';

@Injectable()
export class UuIdGenerator {
    generate(): string {
        return v4()
    }
}