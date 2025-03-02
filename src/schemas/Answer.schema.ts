import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema()
export class Answer extends Document {
    @Prop({type: Number, required: true})
    answerId: number;

    @Prop({type: Number, required: true})
    score: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Characteristic'})
    characteristicId: Types.ObjectId;
}







