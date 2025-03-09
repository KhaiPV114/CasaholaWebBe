import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';
import { CriteriasService } from './criterias.service';
import { CriteriaDto, RoomMatchDto } from './dto/criteria.dto';

@Controller('criterias')
@UseGuards(AuthenticationGruad)
@ApiBearerAuth()
export class CriteriasController {
  constructor(private readonly criteriasService: CriteriasService) {}

  @Post()
  async create(@Body() criteriaDto: CriteriaDto, @Req() req: any) {
    return this.criteriasService.create(criteriaDto, req.userId);
  }

  @Get()
  async findOne(@Req() req: any) {
    return this.criteriasService.findOne(req.userId);
  }

  @Put('/find-room-match')
  async findRoomMatch(@Body() RoomMatchDto: RoomMatchDto, @Req() req: any) {
    return this.criteriasService.findRoomMatch(RoomMatchDto, req.userId);
  }

  @Put(':id')
  async update(
    @Body() criteriaDto: CriteriaDto,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    if (id != req.userId) {
      throw new InternalServerErrorException();
    }

    return this.criteriasService.update(criteriaDto, req.userId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.criteriasService.remove(+id);
  // }
}
