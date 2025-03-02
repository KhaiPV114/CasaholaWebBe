import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'chatRooms' })
export class ChatRoom extends Document {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  RoomId: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Users' }] })
  UserId: Types.ObjectId[];

  @Prop({ required: true })
  SendContent: string;

  @Prop({ default: Date.now })
  SendTime: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
