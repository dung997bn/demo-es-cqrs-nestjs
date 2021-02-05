import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PRODUCT_SERVICE } from "src/common/constants";

@Injectable()
export class ProductPublisher {
    constructor(
        @Inject(PRODUCT_SERVICE)
        private readonly client: ClientProxy
    ) { }

    public publish(pattern: string, data: any) {
        this.client.emit(pattern, data)
    }
}