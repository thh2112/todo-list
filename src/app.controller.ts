import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  public getHello(): string {
    return 'Hello World!';
  }
}
