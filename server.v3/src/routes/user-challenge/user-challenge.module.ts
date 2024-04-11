import { Module } from '@nestjs/common';
import { UserChallengeController } from './user-challenge.controller';
import { UserChallengeService } from './user-challenge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChallengeSchema } from 'src/schemas/user-challenge.schema';
import { ChallengeSchema } from 'src/schemas/challenge.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { VerifyPhotoSchema } from 'src/schemas/verify-photo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserChallenge', schema: UserChallengeSchema },
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'User', schema: UserSchema },
      { name: 'VerifyPhoto', schema: VerifyPhotoSchema },
    ]),
  ],
  controllers: [UserChallengeController],
  providers: [UserChallengeService],
})
export class UserChallengeModule {}
