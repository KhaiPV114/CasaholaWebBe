import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'questions' })
export class Question extends Document {
  @Prop({ required: true })
  questionId: number;

  @Prop({ required: true })
  questionName: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
