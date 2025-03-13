import { Types } from 'mongoose';

export class CreateChatDto {
  receiveUid: string;

  message?: string;

  file?: string;
}

export class LikesEventDto {
  name: string;
  receiveUid: string;
}
