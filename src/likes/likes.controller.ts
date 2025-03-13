import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create.dto';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post()
  async create(@Body() CreateLikeDto: CreateLikeDto) {
    return await this.likesService.create(CreateLikeDto);
  }

  @Put()
  async update(@Body() CreateLikeDto: CreateLikeDto) {
    await this.likesService.delete(CreateLikeDto);
  }

  @Get()
  async get() {}
}
