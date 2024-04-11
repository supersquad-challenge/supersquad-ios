import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { Challenge, ChallengeSchema } from 'src/schemas/challenge.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserChallenge,
  UserChallengeSchema,
} from 'src/schemas/user-challenge.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/middleware/multer-options.factory';
import {
  VerifyPhoto,
  VerifyPhotoSchema,
} from 'src/schemas/verify-photo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
      { name: UserChallenge.name, schema: UserChallengeSchema },
      { name: VerifyPhoto.name, schema: VerifyPhotoSchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => multerOptionsFactory('Challenge'),
    }),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
