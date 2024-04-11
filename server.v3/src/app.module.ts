import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { ChallengeModule } from './routes/challenge/challenge.module';
import { VerifyModule } from './routes/verify/verify.module';
import { UserChallengeModule } from './routes/user-challenge/user-challenge.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './schemas/user.schema';
import { ChallengeSchema } from './schemas/challenge.schema';
import { UserChallengeSchema } from './schemas/user-challenge.schema';
import { VerifyPhotoSchema } from './schemas/verify-photo.schema';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { DevelopModule } from './routes/develop/develop.module';
import { StripeModule } from './routes/stripe/stripe.module';
import { PushModule } from './routes/push/push.module';
import swaggerConfig from './config/swagger.config';
import { AppController } from './app.controller';
import { NotificationSchema } from './schemas/notification.schema';
import { TransactionModule } from './routes/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE}`,
      load: [swaggerConfig],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Challenge',
        schema: ChallengeSchema,
      },
      {
        name: 'UserChallenge',
        schema: UserChallengeSchema,
      },
      {
        name: 'VerifyPhoto',
        schema: VerifyPhotoSchema,
      },
      {
        name: 'Notification',
        schema: NotificationSchema,
      },
    ]),

    UserModule,
    ChallengeModule,
    UserChallengeModule,
    PushModule,
    StripeModule.forRootAsync({
      useFactory: () => ({
        apiKey: process.env.STRIPE_API_KEY,
        options: {
          apiVersion: '2023-10-16',
        },
      }),
    }),
    TransactionModule,
    VerifyModule,
    DevelopModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
