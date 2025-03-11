import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PayOSService } from './payos.service';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payos')
export class PayOSController {
  constructor(private PayOSService: PayOSService) {}

  @Get('create-payment')
  @UseGuards(AuthenticationGruad)
  @ApiBearerAuth()
  async createPayment(
    @Query('orderId') orderId: string,
    @Query('amount') amount: number,
    @Query('type') type: string,
    @Req() req : any
  ) {
    return await this.PayOSService.createPayment(orderId, amount, type, req.userId);
  }

  @Post('receive-webhook')
  async receiveWebhook(@Body() payload: any) {
    this.PayOSService.checkResult(payload);
  }
}
