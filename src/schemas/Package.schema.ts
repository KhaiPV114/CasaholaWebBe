import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'packages' })
export class Package extends Document {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  PackageId: Types.ObjectId;

  @Prop({ required: true })
  Price: number;

  @Prop({ required: true })
  Duration: number;

  @Prop({ required: true })
  Level: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
