import { LikesService } from './../likes/likes.service';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto, LikesEventDto } from './dto/create-chat.dto';
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
  constructor(
    private readonly chatService: ChatService,
    private readonly likesService: LikesService,
  ) {}
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

    this.server.emit(`${createChatDto.receiveUid}`, {
      receiveUid: userId,
      sender: 'friend',
      message: createChatDto.message || createChatDto.file,
    });

    this.server.emit(`receiveMsg`, {
      id: createChatDto.receiveUid,
    });

    return "ok";
  }

  @SubscribeMessage('likes')
  @UseGuards(SocketAuthenticationGuard)
  async likes(
    @MessageBody() LikesEventDto: LikesEventDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = (client as any).userId;

    const matchs = await this.likesService.getMatch(LikesEventDto.receiveUid);

    this.server.emit(`tb-likes`, {
      name: LikesEventDto.name,
      id: userId,
      matchs: matchs,
    });
  }

  @SubscribeMessage('unlikes')
  @UseGuards(SocketAuthenticationGuard)
  async unlikes(
    @MessageBody() LikesEventDto: LikesEventDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = (client as any).userId;

    const matchs = await this.likesService.getMatch(LikesEventDto.receiveUid);

    this.server.emit(`tb-unlikes`, {
      id: userId,
      matchs: matchs,
    });
  }
}
