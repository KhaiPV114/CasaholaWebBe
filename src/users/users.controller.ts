import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('check-package/:id')
  @UseGuards(AuthenticationGruad)
  async checkPackage(@Param('id') id: string, @Req() req: any) {
    if (id !== req.userId) {
      throw new InternalServerErrorException();
    }

    return this.usersService.checkPackage(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
