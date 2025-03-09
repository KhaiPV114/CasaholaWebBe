import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthenticationGruad } from "src/gruads/authentication.gruad";
import { ChatService } from './chat.service';


@Controller('chat')
@UseGuards(AuthenticationGruad)
export class ChatController{

    constructor(private chatService: ChatService){}

    @Get(':sUid/:rUid')
    async getMessages(
        @Param("sUid") sendUid: string,
        @Param("rUid") receiveUid: string
    ) {
        return await this.chatService.findMessage(sendUid, receiveUid);
    }

    @Get(':id')
    async getChats(
        @Param("id") sendUid: string,
    ) {
        return await this.chatService.findDistinctReceivers(sendUid);
    }
}