import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type NotificationDocument = Notification & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Notification {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  message_id: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserChallenge' })
  userChallengeId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
