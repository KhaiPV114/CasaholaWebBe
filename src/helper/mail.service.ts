import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // user: config.GMAIL.USER,
            // pass: config.GMAIL.PASS
        }
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
