import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PRODUCT_CREATE_PATTERN } from './common/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(PRODUCT_CREATE_PATTERN)
  async handleProduct(@Payload() data: any) {
    console.log(data);
    return null
  }
}
