import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'criterias' })
export class Criteria extends Document {
  @Prop({ required: true })
  Purpose: string;

  @Prop()
  Budget: string;

  @Prop()
  MoneyOpinion: string;

  @Prop()
  Habit: string;

  @Prop()
  TimeActivate: string;

  @Prop()
  Hobby: string;

  @Prop()
  Hygiene: string;

  @Prop()
  Outsider: string;

  @Prop()
  Pet: string;

  @Prop()
  Smoking: string;

  @Prop()
  Cooking: string;

  @Prop()
  Vehicle: string;

  @Prop()
  Region: string;

  @Prop()
  SharingWay: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  UserId: Types.ObjectId;
}

export const CriteriaSchema = SchemaFactory.createForClass(Criteria);
