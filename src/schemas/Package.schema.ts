import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'packages' })
export class Package extends Document {
  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  duration?: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' , required: true} )
  userId: Types.ObjectId;

  @Prop({ required: true, default: 'PENDING' })
  status: 'PENDING' | 'SUCCESS' | 'FAIL';

  @Prop({ required: true})
  endDate: Date
}

export const PackageSchema = SchemaFactory.createForClass(Package);
