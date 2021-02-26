import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import * as clc from 'cli-color'

var schedule = require('node-schedule-tz');

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) { }

  onModuleInit() {
    const runTime = 10
    console.log('runTime : ', runTime);
    if (runTime > 0) {
      var rule = `*/${runTime} * * * * *`;
      schedule.scheduleJob(rule, () => {
        console.log(clc.blueBright(`Hello... every ${runTime}`))
      });
    }
  }
}
