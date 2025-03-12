import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthenticationGruad)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Get('likes/:id')
  async getUserLikes(@Param('id') id: string) {
    return await this.usersService.getUserLikes(id);
  }

  @Get('matchs/:id')
  async getUserMatchs(@Param('id') id: string) {
    return await this.usersService.getUserMatchs(id);
  }

  // @Get('check-package/:id')
  // @UseGuards(AuthenticationGruad)
  // async checkPackage(@Param('id') id: string, @Req() req: any) {
  //   if (id !== req.userId) {
  //     throw new InternalServerErrorException();
  //   }

  //   return this.usersService.checkPackage(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
