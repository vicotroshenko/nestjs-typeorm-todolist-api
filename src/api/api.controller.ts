import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class ApiController {
  @Get('/')
  public async helloWorld() {
    return 'Todo list Api';
  }
}
