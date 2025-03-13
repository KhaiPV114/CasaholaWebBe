import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(AuthenticationGruad)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/numberUnread')
  async getNumberMsg(@Req() req: any) {
    try {
      return await this.chatService.getNumberUnread(req.userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':sUid/:rUid')
  async getMessages(
    @Param('sUid') sendUid: string,
    @Param('rUid') receiveUid: string,
  ) {
    return await this.chatService.findMessage(sendUid, receiveUid);
  }

  @Get('/:id')
  async getChats(
    @Param('id') sendUid: string,
    @Query('chooseUid') chooseUid?: string,
  ) {
    return await this.chatService.getContact(sendUid, chooseUid);
  }

  @Put('read/:s/:r')
  async readMsg(@Param('s') sendUid: string, @Param('r') receiveUid: string) {
    try {
      return await this.chatService.readMsg(sendUid, receiveUid);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
