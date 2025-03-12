import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Likes, LikesSchema } from 'src/schemas/Likes.schema';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Likes.name,
        schema: LikesSchema,
      },
    ]),
  ],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
