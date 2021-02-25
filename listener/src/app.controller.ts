import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RedisContext, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CommonConst } from './shared/constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(CommonConst.PRODUCT_REDIS_PATTERN)
  getData(@Payload() data: any, @Ctx() context: RedisContext) {
    console.log(data);
    console.log(context);
  }

}
