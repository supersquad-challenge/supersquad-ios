import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChallengeSchema } from 'src/schemas/user-challenge.schema';
import { NotificationSchema } from 'src/schemas/notification.schema';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserChallenge', schema: UserChallengeSchema },
      { name: 'Notification', schema: NotificationSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [PushController],
  providers: [PushService],
  exports: [PushService],
})
export class PushModule {}
