import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';


@Schema({ _id: false })
export class Status {
  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: '' })
  reasonBlock: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);


@Schema({ _id: false })
export class Activation {
  @Prop()
  token: string;

  @Prop()
  expires: Date;
}

export const ActivationSchema = SchemaFactory.createForClass(Activation);


@Schema()
export class ResetPWToken {

  @Prop()
  email: string;

  @Prop()
  token: string;

  @Prop()
  expires: Date;
}

export const ResetPWTokenSchema = SchemaFactory.createForClass(ResetPWToken);


@Schema({ collection: 'Account', timestamps: true })
export class Account extends Document{
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({default: ''})
  googleId?: string;

  @Prop({ type: StatusSchema, default: { isBlocked: true, reasonBlock: '' } })
  status?: Status;

  @Prop({ sparse: true, unique: true })
  refreshToken?: string;

  @Prop({ type: ActivationSchema, default: null })
  activation?: Activation;

  @Prop({ type: Boolean, default: false, required: true})
  isAuthGoogle: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
