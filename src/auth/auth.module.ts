import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountService } from 'src/account/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Account,
  AccountSchema,
  ResetPWToken,
  ResetPWTokenSchema,
} from 'src/schemas/Account.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/schemas/User.schema';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ResetPWToken.name,
        schema: ResetPWTokenSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService, UsersService, MailService],
})
export class AuthModule {}
