import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from 'src/likes/likes.service';
import { ChatRoom, ChatRoomSchema } from 'src/schemas/ChatRoom.schema';
import { Likes, LikesSchema } from 'src/schemas/Likes.schema';
import { StatusChat, StatusChatSchema } from 'src/schemas/StatusChat.schema';
import { User, UserSchema } from 'src/schemas/User.schema';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatRoom.name,
        schema: ChatRoomSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Likes.name,
        schema: LikesSchema,
      },
      {
        name: StatusChat.name,
        schema: StatusChatSchema,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, LikesService],
})
export class ChatModule {}
