import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketAuthenticationGuard } from 'src/gruads/socket-authentication.gruad';

@WebSocketGateway(4002, {
  cors: ['http://localhost:3000'],
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}
  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  @SubscribeMessage('createChat')
  @UseGuards(SocketAuthenticationGuard)
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = (client as any).userId;
    await this.chatService.create(createChatDto, userId);
    console.log(userId, createChatDto);

    this.server.emit(`${createChatDto.receiveUid}`, {
      receiveUid: userId,
      sender: 'friend',
      message: createChatDto.message || createChatDto.file,
    });

    this.server.emit(`tb${createChatDto.receiveUid}`, {
      id: userId,
    });
  }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
