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

  @Prop({ required: false, default: '' })
  phoneNumber?: string;

  @Prop({ required: false, default: '' })
  dob?: Date;

  @Prop({ required: false, default: '' })
  gender?: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Package' }] })
  packageId?: Types.ObjectId[];

  @Prop({ required: false })
  identificationImage?: string;

  @Prop({ required: false })
  profileImage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

