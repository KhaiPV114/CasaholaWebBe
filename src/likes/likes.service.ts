import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Likes } from 'src/schemas/Likes.schema';
import { CreateLikeDto } from './dto/create.dto';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Likes.name) private likeModel: Model<Likes>) {}

  async create(createLikeDto: CreateLikeDto) {
    await this.likeModel.create({
      ...createLikeDto,
    });
  }
  async delete(CreateLikeDto: CreateLikeDto) {
    await this.likeModel.findOneAndDelete({
      ...CreateLikeDto,
    });
  }

  async getSourceUids(id: string) {
    const sourceUids = await this.likeModel
      .find({
        targetUid: id,
      })
      .select('-targetUid -__v -_id');
    return sourceUids.map((v) => v['sourceUid'].toString());
  }

  async getMatch(id: string) {
    const targetUids = await this.likeModel
      .find({
        sourceUid: id,
      })
      .select('-sourceUid -__v -_id');
    return targetUids.map((v) => v['targetUid'].toString());
  }
}
