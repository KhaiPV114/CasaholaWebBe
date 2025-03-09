import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from 'src/schemas/ChatRoom.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatRoom.name) private chatModel: Model<ChatRoom>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createChatDto: CreateChatDto, sendUid: string) {
    return await this.chatModel.create({
      ...createChatDto,
      sendUid,
    });
  }

  async findMessage(sendUid: string, receiveUid: string) {
    return await this.chatModel
      .find({
        $or: [
          { sendUid: sendUid, receiveUid: receiveUid },
          { sendUid: receiveUid, receiveUid: sendUid },
        ],
      })
      .sort({ timestamp: 1 });
  }

  async findDistinctReceivers(sendUid: string) {
    const userId = await this.chatModel.distinct('receiveUid', {
      sendUid: sendUid,
    });

    return this.userModel.find({
      _id: { $in: userId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
