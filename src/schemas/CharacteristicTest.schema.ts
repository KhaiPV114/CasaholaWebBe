import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'characteristicTests' })
export class CharacteristicTest extends Document {
  @Prop({ required: true })
  testId: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }] })
  question: Types.ObjectId[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Answer' }] })
  answers: Types.ObjectId[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const CharacteristicTestSchema = SchemaFactory.createForClass(CharacteristicTest);
