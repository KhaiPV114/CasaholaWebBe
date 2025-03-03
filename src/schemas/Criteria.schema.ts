import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'criterias' })
export class Criteria extends Document {
  @Prop()
  purpose: string;

  @Prop()
  budget: string;

  @Prop()
  moneyOpinion: string;

  @Prop()
  habit: string;

  @Prop()
  timeActivate: string;

  @Prop()
  hobby: string;

  @Prop()
  hygiene: string;

  @Prop()
  outsider: string;

  @Prop()
  pet: string;

  @Prop()
  cooking: string;

  @Prop()
  vehicle: string;

  @Prop()
  region: string;

  @Prop()
  sharingWay: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;
}

export const CriteriaSchema = SchemaFactory.createForClass(Criteria);
