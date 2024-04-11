import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './stripe.module-definition';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChallengeSchema } from 'src/schemas/user-challenge.schema';
import { ChallengeSchema } from 'src/schemas/challenge.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { PushModule } from '../push/push.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserChallenge', schema: UserChallengeSchema },
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'User', schema: UserSchema },
    ]),
    PushModule,
  ],
  providers: [StripeService],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule extends ConfigurableModuleClass {}
