import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ChallengeDocument = Challenge & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Challenge {
  @Prop()
  category: string;

  @Prop()
  name: string;

  @Prop()
  thumbnailUrl: string;

  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;

  @Prop()
  frequency: number;

  @Prop()
  period: number;

  @Prop()
  totalVerifyNum: number;

  @Prop()
  participants: number;

  @Prop()
  verifyMethod: string;

  @Prop()
  depositMethod: string;

  @Prop()
  cashSuccessPool: number;

  @Prop()
  cashFailPool: number;

  @Prop()
  cryptoSuccessPool: number;

  @Prop()
  cryptoFailPool: number;

  @Prop()
  addressSuccessPool: string;

  @Prop()
  addressFailPool: string;

  @Prop()
  howTo: string;

  @Prop()
  description: string;

  @Prop()
  winnerId: string;

  @Prop()
  pledge: number;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge).index({
  name: 'text',
  category: 'text',
});
