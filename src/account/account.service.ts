import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/Account.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ResetPWTokenDto } from 'src/auth/dto/resetPWToken.dto';

@Injectable()
export class AccountService {

  constructor(
    @InjectModel(Account.name) private AccountModel: Model<Account>,
    private userService: UsersService
  ) { }

  async create(registerDto: RegisterDto) {
    console.log(registerDto)
    const { email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const isDuplicate = await this.AccountModel.findOne({
      email
    })

    if (isDuplicate) {
      throw new BadRequestException("Account is already existed")
    }

    const user = await this.userService.create(registerDto);

    return this.AccountModel.create({
      userId: user._id,
      email,
      password: hashedPassword
    });
  }

  // findAll() {
  //   return `This action returns all account`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }

}
