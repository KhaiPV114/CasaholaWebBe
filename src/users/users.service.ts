import { LikesService } from 'src/likes/likes.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from 'src/schemas/User.schema';
import { GoogleLoginDto } from './../auth/dto/googleLogin.dto';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UsersModel: Model<User>,
    private LikesService: LikesService,
  ) {}

  async create(RegisterDto: RegisterDto) {
    const {
      fullName,
      phoneNumber,
      gender,
      dob,
      profileImage,
      identificationImage,
    } = RegisterDto;
    return await this.UsersModel.create({
      fullName,
      phoneNumber,
      gender,
      dob,
      profileImage,
      identificationImage,
    });
  }

  async createGoogleUser(TokenPayload: TokenPayload) {
    const { name, picture } = TokenPayload;
    return await this.UsersModel.create({
      fullName: name,
      profileImage: picture,
    });
  }

  async findAll() {
    return await this.UsersModel.find();
  }

  async findOne(id: string) {
    const user = await this.UsersModel.findById(id);
    if (!user) {
      throw new BadRequestException('Not Found!');
    }
    return user;
  }

  async getUserLikes(id: string) {
    const userIds = await this.LikesService.getSourceUids(id);

    const users = await this.UsersModel.find({
      _id: { $in: userIds },
    });

    return users;
  }

  async getUserMatchs(id: string) {
    const userIds = await this.LikesService.getMatch(id);

    const users = await this.UsersModel.find({
      _id: { $in: userIds },
    });

    return users;
  }

  // async checkPackage(id: string) {
  //   const user = await this.UsersModel.findById(id);
  //   if (!user) {
  //     throw new BadRequestException('Not Found!');
  //   }
  //   return {
  //     package: user.packageId,
  //   };
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
