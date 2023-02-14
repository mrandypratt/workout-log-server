import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  authenticate(@Req() request: Request) {
    console.log(request);
    return { Received: 'Request' };
  }
}
