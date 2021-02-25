import { UpdateProductQueryCommand, CreateProductQueryCommand, DeleteProductQueryCommand } from './../../product.queryside/commands/implements';
import { ProductCreatedEvent } from './../events/event-stream-created.event';
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";
import { CommonConst } from '../../shared/constants';

export class ProductDomainSagas {
    @Saga()
    querySide = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ProductCreatedEvent),
            map((event: any) => {
                console.log(clc.redBright("Inside Product Sagas Saga"))
                const baseEventStream = event.baseEventStream;

                let cmd: ICommand;
                switch (baseEventStream.payload.eventName) {
                    case CommonConst.AGGREGATES.PRODUCT.CREATED:
                        cmd = new CreateProductQueryCommand(
                            baseEventStream.messagePattern,
                            baseEventStream.streamId,
                            baseEventStream.payload
                        );
                        break;
                    case CommonConst.AGGREGATES.PRODUCT.UPDATED:
                        cmd = new UpdateProductQueryCommand(
                            baseEventStream.messagePattern,
                            baseEventStream.streamId,
                            baseEventStream.payload
                        );
                        break;
                    case CommonConst.AGGREGATES.PRODUCT.DELETED:
                        cmd = new DeleteProductQueryCommand(
                            baseEventStream.messagePattern,
                            baseEventStream.streamId,
                            baseEventStream.payload
                        );
                        break;
                    default:
                        break;
                }
                return cmd
            }),
        );
    }
}