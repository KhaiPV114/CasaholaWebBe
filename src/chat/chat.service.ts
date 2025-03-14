import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatRoom } from 'src/schemas/ChatRoom.schema';
import { StatusChat } from 'src/schemas/StatusChat.schema';
import { User } from 'src/schemas/User.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatRoom.name) private chatModel: Model<ChatRoom>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(StatusChat.name) private statusChatModel: Model<StatusChat>,
  ) {}

  async create(createChatDto: CreateChatDto, sendUid: string) {
    await this.chatModel.create({
      ...createChatDto,
      sendUid,
    });

    const isExisted = await this.checkRoom(createChatDto.receiveUid, sendUid);

    if (isExisted) {
      isExisted.sendTime = new Date();
      isExisted.lastSend = new Types.ObjectId(sendUid);
      isExisted.status = false;
      isExisted.save();
    } else {
      await this.statusChatModel.create({
        uidFirst: createChatDto.receiveUid,
        uidSecord: sendUid,
        lastSend: sendUid,
      });
    }
  }

  async getContact(sendUid: string, uidChoose?: string) {
    const data = await this.statusChatModel.find({
      $or: [
        {
          uidFirst: sendUid,
        },
        {
          uidSecord: sendUid,
        },
      ],
    });

    const new_data = data.reduce((uid, d) => {
      if (d.uidFirst.toString() !== sendUid) {
        uid.push(d.uidFirst.toString());
      }
      if (d.uidSecord.toString() !== sendUid) {
        uid.push(d.uidSecord.toString());
      }
      return uid;
    }, [] as string[]);

    if (uidChoose) {
      new_data.push(uidChoose);
    }

    const uids = [...new Set(new_data)];

    const users = await this.userModel.find({
      _id: { $in: uids },
    });

    const userMap = users.reduce((map, user) => {
      map.set((user._id as Types.ObjectId).toString(), user);
      return map;
    }, new Map());

    const result = data
      .map((d) => {
        let u: any;

        if (d.uidFirst.toString() !== sendUid) {
          u = userMap.get(d.uidFirst.toString());
        }

        if (d.uidSecord.toString() !== sendUid) {
          u = userMap.get(d.uidSecord.toString());
        }

        return {
          // user: {
          _id: u._id,
          fullName: u.fullName,
          identificationImage: u.identificationImage,
          profileImage: u.profileImage,
          lastSend: d.lastSend,
          status: d.status,
          sendTime: d.sendTime,
          // },
        };
      })
      .sort((a, b) => b.sendTime.getTime() - a.sendTime.getTime());

    if (uidChoose && !result.find((r) => r._id.toString() === uidChoose)) {
      const chooseUser = userMap.get(uidChoose);
      result.unshift({
        _id: chooseUser._id,
        fullName: chooseUser.fullName,
        identificationImage: chooseUser.identificationImage,
        profileImage: chooseUser.profileImage,
        lastSend: new Types.ObjectId(sendUid),
        status: true,
        sendTime: new Date(),
      });
    }

    return result;
  }

  async checkRoom(uidFrist: string, uidSecord: string) {
    const data = await this.statusChatModel.find({
      $or: [
        {
          uidFirst: uidFrist,
          uidSecord: uidSecord,
        },
        {
          uidFirst: uidSecord,
          uidSecord: uidFrist,
        },
      ],
    });

    if (data.length > 0) {
      return data[0];
    }

    return null;
  }

  async findMessage(sendUid: string, receiveUid: string) {
    return await this.chatModel
      .find({
        $or: [
          { sendUid: sendUid, receiveUid: receiveUid },
          { sendUid: receiveUid, receiveUid: sendUid },
        ],
      })
      .sort({ sendTime: 1 });
  }

  // async findDistinctReceivers(sendUid: string, chooseUid?: Types.ObjectId) {
  //   const userIds = await this.chatModel.distinct('receiveUid', {
  //     sendUid: sendUid,
  //   });

  //   const userId = await this.chatModel.distinct('sendUid', {
  //     receiveUid: sendUid,
  //   });

  //   const allUserIds = [...userIds, ...userId];

  //   const uniqueUserIds = [...new Set(allUserIds)];
  //   if (chooseUid) {
  //     uniqueUserIds.push(chooseUid);
  //   }

  //   await this.getContact(sendUid, chooseUid?.toString());

  //   return this.userModel.find({
  //     _id: { $in: uniqueUserIds },
  //   });
  // }

  async readMsg(sendUid: string, receiveUid: string) {
    const msg = await this.checkRoom(sendUid, receiveUid);

    if (!msg) {
      throw new InternalServerErrorException();
    }

    msg.status = true;

    await msg.save();

    return await this.getNumberUnread(sendUid);
  }

  async getNumberUnread(id: string) {
    const data = await this.statusChatModel.find({
      $or: [
        { uidFirst: id, status: false, lastSend: { $ne: id } },
        { uidSecord: id, status: false, lastSend: { $ne: id } },
      ],
    });

    return data.length;
  }
}
