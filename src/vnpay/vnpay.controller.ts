import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';

@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('payment')
  @UseGuards(AuthenticationGruad)
  generatePaymentUrl(
    // @Query('orderInfo') orderInfo: string,
    @Query('amount') amount: number,
    @Query('orderId') orderId: string,
  ) {
    const paymentUrl = this.vnpayService.generatePaymentUrl(
      // orderInfo,
      amount,
      orderId,
    );
    return paymentUrl;
  }

  @Get('return')
  async handleCallback(@Query() queryParams: any) {
    return await this.vnpayService.handleCallback(queryParams);
  }
}
