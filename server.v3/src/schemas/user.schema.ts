import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  _id: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  profileUrl: string;

  @Prop()
  locale: string;

  @Prop()
  timezone: string;

  @Prop()
  points: number;

  @Prop()
  deviceToken: string;

  @Prop()
  walletAddress: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
