import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type VerifyPhotoDocument = VerifyPhoto & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class VerifyPhoto {
  @Prop()
  photoUrl: string;

  @Prop()
  uploadedAt: string;

  @Prop()
  checkedAt: string;

  @Prop()
  checkStatus: string;

  @Prop()
  checkResult: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserChallenge' })
  userChallengeId: mongoose.Types.ObjectId;
}

export const VerifyPhotoSchema = SchemaFactory.createForClass(VerifyPhoto);
