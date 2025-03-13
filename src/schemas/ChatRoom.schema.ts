import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'chatRooms' })
export class ChatRoom extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  sendUid: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  receiveUid: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  sendTime: Date;

  @Prop({ required: false })
  file?: string;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
