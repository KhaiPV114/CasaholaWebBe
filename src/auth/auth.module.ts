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
import { LikesService } from 'src/likes/likes.service';
import { Likes, LikesSchema } from 'src/schemas/Likes.schema';
import { ChatService } from 'src/chat/chat.service';
import { ChatRoom, ChatRoomSchema } from 'src/schemas/ChatRoom.schema';
import { StatusChat, StatusChatSchema } from 'src/schemas/StatusChat.schema';

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
      {
        name: Likes.name,
        schema: LikesSchema,
      },
      {
        name: ChatRoom.name,
        schema: ChatRoomSchema,
      },
      {
        name: StatusChat.name,
        schema: StatusChatSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService,
    UsersService,
    MailService,
    LikesService,
    ChatService,
  ],
})
export class AuthModule {}
