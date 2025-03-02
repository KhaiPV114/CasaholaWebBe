import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ROLES } from 'src/constants/role';


@Schema({ collection: 'users', timestamps: true })
export class User extends Document {

  @Prop({ required: true })
  fullName: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Characteristic' })
  characteristicId?: Types.ObjectId;

  @Prop({ required: true, default: ROLES.USER })
  role?: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Package' }] })
  packageId?: Types.ObjectId[];

  @Prop({ required: false })
  identificationImage?: string;

  @Prop({ required: false })
  profileImage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

