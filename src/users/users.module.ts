import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Likes, LikesSchema } from 'src/schemas/Likes.schema';
import { LikesService } from 'src/likes/likes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
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
  controllers: [UsersController],
  providers: [UsersService, LikesService],
})
export class UsersModule {}
