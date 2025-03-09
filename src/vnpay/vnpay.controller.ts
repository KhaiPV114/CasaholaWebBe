import { Controller, Get, InternalServerErrorException, Query, Req, Res, UseGuards } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';

@Controller('vnpay')
@UseGuards(AuthenticationGruad)
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('payment')
  async generatePaymentUrl(
    // @Query('orderInfo') orderInfo: string,
    @Query('amount') amount: number,
    @Query('orderId') orderId: string,
    @Req() req : any
  ) {
    if ( req.userId !== orderId) {
      throw new InternalServerErrorException()
    }
    const paymentUrl = this.vnpayService.generatePaymentUrl(
      req.userId,
      amount,
      orderId
    );
    return paymentUrl;
  }

  @Get('return')
  async handleCallback(@Query() queryParams: any) {
    return await this.vnpayService.handleCallback(queryParams);
  }
}
