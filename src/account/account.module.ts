import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/schemas/Account.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/schemas/User.schema';
import { LikesService } from 'src/likes/likes.service';
import { Likes, LikesSchema } from 'src/schemas/Likes.schema';

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
        name: Likes.name,
        schema: LikesSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, UsersService, LikesService],
})
export class AccountModule {}
