import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'characteristics' })
export class Characteristic extends Document {
  @Prop({ required: true })
  CharacteristicId: number;

  @Prop({ required: true })
  Name: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Characteristic' }] })
  SuitableCharacteristic: Types.ObjectId[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }] })
  QuestionIds: Types.ObjectId[];
}

export const CharacteristicSchema = SchemaFactory.createForClass(Characteristic);