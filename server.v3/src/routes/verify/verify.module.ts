import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyPhotoSchema } from 'src/schemas/verify-photo.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/middleware/multer-options.factory';
import { UserChallengeSchema } from 'src/schemas/user-challenge.schema';
import { PushModule } from '../push/push.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VerifyPhoto', schema: VerifyPhotoSchema },
      { name: 'UserChallenge', schema: UserChallengeSchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => multerOptionsFactory('VerifyPhoto'),
    }),
    PushModule,
  ],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
