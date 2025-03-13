import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'StatusChat' })
export class StatusChat extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  uidFirst: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  uidSecord: Types.ObjectId;

  @Prop({ default: Date.now })
  sendTime: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  lastSend: Types.ObjectId;

  @Prop({ default: false })
  status: boolean;
}

export const StatusChatSchema = SchemaFactory.createForClass(StatusChat);
