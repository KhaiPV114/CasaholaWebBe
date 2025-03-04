import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'characteristics' })
export class Characteristic extends Document {
  @Prop({ required: true })
  characteristicId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Characteristic' }] })
  suitableCharacteristic: Types.ObjectId[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }] })
  questionIds: Types.ObjectId[];
}

export const CharacteristicSchema = SchemaFactory.createForClass(Characteristic);