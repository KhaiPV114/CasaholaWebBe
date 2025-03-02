import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'characteristicTests' })
export class CharacteristicTest extends Document {
  @Prop({ required: true })
  TestId: number;

  @Prop({ required: true })
  Date: Date;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }] })
  Question: Types.ObjectId[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Answer' }] })
  Answers: Types.ObjectId[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  UserId: Types.ObjectId;
}

export const CharacteristicTestSchema = SchemaFactory.createForClass(CharacteristicTest);
