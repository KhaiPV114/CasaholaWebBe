import { BadRequestException, Injectable, Type, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account, ResetPWToken } from 'src/schemas/Account.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/User.schema';
import { nanoid } from 'nanoid';
import { ResetPWTokenDto } from './dto/resetPWToken.dto';
import e from 'express';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ResetPWToken.name) private resetPWToken: Model<ResetPWToken>,
    private accountService: AccountService,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {
    return this.accountService.create(registerDto)
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const account = await this.accountModel.findOne({
      email
    });

    if (!account) {
      throw new UnauthorizedException("Wrong");
    }

    const isCompare = await bcrypt.compare(password, account.password);
    if (!isCompare) {
      throw new UnauthorizedException("Wrong");
    }

    const user = await this.userModel.findById(account.userId)

    if (!user) {
      throw new UnauthorizedException("Wrong");
    }
    const { fullName, gender, dob, phoneNumber, _id } = user;

    const token = await this.generateToken(_id)
    return {
      id: _id,
      email,
      fullName,
      gender,
      dob,
      phoneNumber,
      ...token
    }
  }

  async forgotPassword(email: string) {
    const account = await this.accountModel.findOne({
      email
    })

    if (!account) {
      return { message: "Not found email" }
    }

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    const token = nanoid(64)

    await this.resetPWToken.create({
      email,
      token,
      expires
    })

    return { message: 'If this user exists, they will receive an email' };
  }


  async resetPassword(resetPWToken: ResetPWTokenDto) {

    const { password, resetToken } = resetPWToken;
    const token = await this.resetPWToken.findOneAndDelete({
      token: resetToken,
      expires: { $gte: new Date() }
    })

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    const user = await this.accountModel.findOne({
      email: token.email
    })

    if (!user) {
      throw new BadRequestException("Not Found")
    }

    user.password = await bcrypt.hash(password, 10);

    await user.save()
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const {newPassword, oldPassword} = changePasswordDto;
    const account = await this.accountModel.findById(userId)

    if (!account) {
      throw new BadRequestException("Not Found")
    }

    const isCompare = await bcrypt.compare(oldPassword, account.password)

    if(!isCompare) {
      throw new UnauthorizedException('Wrong');
    }

    account.password = await bcrypt.hash(newPassword, 10)

    await account.save()
  }

  async refreshToken(refreshToken: string) {
    const token = this.jwtService.verify(refreshToken);
    const { userId } = token;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException("Wrong")
    }

    return { token: this.jwtService.sign({ userId }, { expiresIn: '10h' }) };
  }

  async generateToken(userId: any) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1m' });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '3w' });

    return {
      accessToken,
      refreshToken
    }
  }


}
