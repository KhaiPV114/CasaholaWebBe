import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendPasswordResetEmail(to: string, token: string) {
    const url = `${this.configService.get('fe.url')}reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: to,
      subject: 'Test',
      template: './forgot-password.hbs',
      context: {
        url,
      },
    });
  }
}
