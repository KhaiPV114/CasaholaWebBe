import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';

@Injectable()
export class VnpayService {
  private tmnCode: string;
  private hashSecret: string;
  private vnpUrl: string;
  private returnUrl: string;

  constructor(private configService: ConfigService) {
    this.tmnCode = this.configService.get('vpn.tmnCode') || '';
    this.hashSecret = this.configService.get('vpn.hashSecret') || '';
    this.vnpUrl = this.configService.get('vpn.vnpUrl') || '';
    this.returnUrl = this.configService.get('vpn.returnUrl') || '';
  }

  // Tạo URL thanh toán VNPAY
  generatePaymentUrl(
    // orderInfo: string,
    amount: number,
    orderId: string,
  ): string {
    const currCode = 'VND';
    const date = new Date();

    const createDate = this.formatDate(date);

    const vnp_Params: Record<string, string | number> = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = this.tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = this.generateTransactionNo();
    vnp_Params['vnp_OrderInfo'] = orderId;
    vnp_Params['vnp_OrderType'] = '250000';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = this.returnUrl;
    vnp_Params['vnp_IpAddr'] = '58.186.79.161';
    vnp_Params['vnp_CreateDate'] = createDate;

    const sortedParams = this.sortObject(vnp_Params);

    const signData = qs.stringify(sortedParams, { encode: true });
    const hmac = crypto.createHmac('sha512', this.hashSecret);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;
    const vnpUrl =
      this.vnpUrl + '?' + qs.stringify(vnp_Params, { encode: true });

    return vnpUrl;
  }

  private generateTransactionNo(): string {
    return Math.floor(Math.random() * 1000000000).toString();
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    const hh = ('0' + date.getHours()).slice(-2);
    const min = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);
    return `${yyyy}${mm}${dd}${hh}${min}${ss}`;
  }

  private sortObject(
    obj: Record<string, string | number>,
  ): Record<string, string | number> {
    const sortedEntries = Object.entries(obj).sort(([keyA], [keyB]) => {
      return keyA.localeCompare(keyB);
    });

    return Object.fromEntries(sortedEntries);
  }

  async handleCallback(queryParams: any) {
    const secureHash = queryParams['vnp_SecureHash'];
    delete queryParams['vnp_SecureHash'];
    delete queryParams['vnp_SecureHashType'];

    const sortedParams = this.sortObject(queryParams);

    const signData = qs.stringify(sortedParams, { encode: true });
    const hmac = crypto.createHmac('sha512', this.hashSecret);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (signed === secureHash) {
      return {
        status: 'success',
        message: 'Payment success',
        data: queryParams,
      };
    } else {
      return { status: 'failed', message: 'Invalid signature' };
    }
  }
}
