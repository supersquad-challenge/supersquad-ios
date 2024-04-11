import { Module } from '@nestjs/common';
import { DevelopController } from './develop.controller';
import { DevelopService } from './develop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { ChallengeSchema } from 'src/schemas/challenge.schema';
import { UserChallengeSchema } from 'src/schemas/user-challenge.schema';
import { VerifyPhotoSchema } from 'src/schemas/verify-photo.schema';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'UserChallenge', schema: UserChallengeSchema },
      { name: 'verifyPhoto', schema: VerifyPhotoSchema },
    ]),
    TransactionModule,
  ],
  controllers: [DevelopController],
  providers: [DevelopService],
})
export class DevelopModule {}
