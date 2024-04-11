import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserChallengeDocument = UserChallenge & mongoose.Document;

@Schema()
export class UserChallenge {
  @Prop()
  challengeStartAt: Date;

  @Prop()
  challengeEndAt: Date;

  @Prop()
  userPeriod: number;

  @Prop()
  userFrequency: number;

  @Prop()
  userTotalVerifyNum: number;

  @Prop()
  alarmTime: string;

  @Prop()
  alarmWeek: string[];

  @Prop()
  status: string;

  @Prop()
  deposit: number;

  @Prop()
  intentId: string;

  @Prop()
  currency: string;

  @Prop()
  completeNum: number;

  @Prop()
  successRate: number;

  @Prop()
  isPhotoUploadedToday: boolean;

  @Prop()
  isViewResults: boolean;

  @Prop()
  successStatus: boolean;

  @Prop()
  profit: number;

  @Prop()
  cashPayback: number;

  @Prop()
  isPaybackPaid: boolean;

  @Prop()
  walletAddress: string;

  @Prop()
  verifyStatus: mongoose.Schema.Types.Mixed;

  @Prop()
  photoStatus: mongoose.Schema.Types.Mixed;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' })
  challengeId: mongoose.Types.ObjectId;
}

export const UserChallengeSchema = SchemaFactory.createForClass(UserChallenge);
