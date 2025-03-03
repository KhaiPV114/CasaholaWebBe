import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationGruad } from './gruads/authentication.gruad';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(AuthenticationGruad)
  @ApiBearerAuth()
  async getTest() {
    return 'Ok';
  }
}
