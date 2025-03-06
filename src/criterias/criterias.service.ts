import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CriteriaDto, RoomMatchDto } from './dto/criteria.dto';
import { Criteria } from 'src/schemas/Criteria.schema';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class CriteriasService {
  constructor(
    @InjectModel(Criteria.name) private CriteriaModel: Model<Criteria>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(criteriaDto: CriteriaDto, userId: Types.ObjectId) {
    console.log(criteriaDto)
    await this.CriteriaModel.create({
      userId: userId,
      ...criteriaDto,
    });
  }
 
  async findOne(userId: Types.ObjectId) {
    const criteria = await this.CriteriaModel.findOne({
      userId
    })

    if (!criteria) {
      return {criteria : null}
    }

    return {criteria};
  }

  async findRoomMatch(RoomMatchDto: RoomMatchDto) {
    const criteria = await this.CriteriaModel.find({
      ...RoomMatchDto,
    });

    if (!criteria) {
      return [];
    }

    const userIds = criteria.map((c) => c.userId);

    const users = await this.UserModel.find({
      _id: { $in: userIds },
    }).select('-packageId -createdAt -updatedAt');

    return users;
  }
  async update(criteriaDto: CriteriaDto, userId: Types.ObjectId) {
    const criteria = await this.CriteriaModel.findOne({
      userId,
    });

    if (!criteria) {
      throw new BadRequestException('Not Found');
    }

    await this.CriteriaModel.updateOne(
      { userId },
      {
        $set: {
          ...criteriaDto,
        },
      },
    );
  }
  // remove(id: number) {
  //   return `This action removes a #${id} criteria`;
  // }
}
