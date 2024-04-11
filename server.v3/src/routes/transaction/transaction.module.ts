import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PushModule } from '../push/push.module';
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
    PushModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
