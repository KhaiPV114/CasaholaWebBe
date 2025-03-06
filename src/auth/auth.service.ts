import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Model } from 'mongoose';
import { AccountService } from 'src/account/account.service';
import { ResetPWToken } from 'src/schemas/Account.schema';
import { User } from 'src/schemas/User.schema';
import { Account } from './../schemas/Account.schema';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPWTokenDto } from './dto/resetPWToken.dto';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ResetPWToken.name) private resetPWToken: Model<ResetPWToken>,
    private configService: ConfigService,
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(this.configService.get('google.id'));
  }

  async register(registerDto: RegisterDto) {
    return this.accountService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const account = await this.accountModel.findOne({
      email,
    });

    if (!account) {
      throw new UnauthorizedException('Wrong');
    }

    const isCompare = await bcrypt.compare(password, account.password);
    if (!isCompare) {
      throw new UnauthorizedException('Wrong');
    }

    const user = await this.userModel.findById(account.userId);

    if (!user) {
      throw new UnauthorizedException('Wrong');
    }
    const { fullName, gender, dob, phoneNumber, _id } = user;

    const token = await this.generateToken(_id);
    return {
      user: {
        id: _id,
        email,
        fullName,
        gender,
        dob,
        phoneNumber,
      },
      ...token,
    };
  }

  async forgotPassword(email: string) {
    const account = await this.accountModel.findOne({
      email,
    });

    if (!account) {
      return { message: 'Not found email' };
    }

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    const token = uuidv4();

    await this.resetPWToken.create({
      email,
      token,
      expires,
    });

    return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(resetPWToken: ResetPWTokenDto) {
    const { password, resetToken } = resetPWToken;
    const token = await this.resetPWToken.findOneAndDelete({
      token: resetToken,
      expires: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    const user = await this.accountModel.findOne({
      email: token.email,
    });

    if (!user) {
      throw new BadRequestException('Not Found');
    }

    user.password = await bcrypt.hash(password, 10);

    await user.save();
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { newPassword, oldPassword } = changePasswordDto;
    const account = await this.accountModel.findById(userId);

    if (!account) {
      throw new BadRequestException('Not Found');
    }

    const isCompare = await bcrypt.compare(oldPassword, account.password);

    if (!isCompare) {
      throw new UnauthorizedException('Wrong');
    }

    account.password = await bcrypt.hash(newPassword, 10);

    await account.save();
  }

  async refreshToken(refreshToken: string) {
    const token = this.jwtService.verify(refreshToken);
    const { userId } = token;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Wrong');
    }

    return { token: this.jwtService.sign({ userId }, { expiresIn: '30m' }) };
  }

  async generateToken(userId: any) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '3w' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyGoogleLogin(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.configService.get('google.id'),
      });

      const payload = ticket.getPayload();

      const { email } = payload as TokenPayload;

      let account = await this.accountModel.findOne({
        email,
      });

      if (!account) {
        account = await this.accountService.createAccountGoogle(
          payload as TokenPayload,
        );
      }

      const user = await this.userModel.findById(account.userId);

      if (!user) {
        throw new UnauthorizedException('Wrong');
      }

      const { fullName, gender, dob, phoneNumber, _id } = user;

      const generateToken = await this.generateToken(_id);
      return {
        id: _id,
        email,
        fullName,
        gender,
        dob,
        phoneNumber,
        ...generateToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Google Login Eror!');
    }
  }

  async accountRemember(accessToken: string) {
    const token = this.jwtService.verify(accessToken);
    const { userId } = token;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Wrong');
    }
    const { fullName, gender, dob, phoneNumber, _id } = user;

    const account = await this.accountModel.findOne({
      userId: _id,
    });
    if (!account) {
      throw new UnauthorizedException('Wrong');
    }
    const remember = await this.generateToken(_id);

    return {
      user: {
        id: _id,
        email: account.email,
        fullName,
        gender,
        dob,
        phoneNumber,
      },
      ...remember,
    };
  }
}
