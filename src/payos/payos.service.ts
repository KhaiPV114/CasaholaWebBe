import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import PayOS from '@payos/node';
import { Model } from 'mongoose';
import { Package } from 'src/schemas/Package.schema';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PayOSService {
  private payos: PayOS;
  private PACKAGE_TYPE = {
    35000: 'GOLD',
    50000: 'PLATINUM',
  };

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Package.name) private packageModel: Model<Package>,
  ) {
    this.payos = new PayOS(
      this.configService.get('payos.id') || '',
      this.configService.get('payos.apiKey') || '',
      this.configService.get('payos.checksumKey') || '',
    );
  }

  async createPayment(
    orderId: string,
    amount: number,
    type: string,
    userId: string,
  ) {
    const body = {
      orderCode: Number(orderId),
      amount: Number(amount),
      description: `kich hoat goi ${type}`,
      cancelUrl: `${this.configService.get('fe.url')}payment-failure`,
      returnUrl: `${this.configService.get('fe.url')}payment-success`,
    };

    const date = new Date();

    await this.packageModel.create({
      price: amount,
      userId: userId,
      endDate: date.setMonth(date.getMonth() + 1),
      orderId: orderId,
    });

    const paymentLinkRes = await this.payos.createPaymentLink(body);

    return paymentLinkRes.checkoutUrl;
  }

  async checkResult(payload: any) {
    const {
      success,
      data: { orderCode },
    } = payload;

    if (!success) return;

    const packages = await this.packageModel.findOne({
      orderId: orderCode,
    });

    if (!packages) {
      throw new InternalServerErrorException('Not found package');
    }

    packages.status = 'SUCCESS';
    await packages.save();
    const user = await this.userModel.findById(packages.userId);
    if (!user) {
      throw new InternalServerErrorException('Not found user');
    }
    user.packageType = this.PACKAGE_TYPE[packages.price];
    await user.save();
  }
}
