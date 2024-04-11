import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/middleware/multer-options.factory';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.registerAsync({
      useFactory: () => multerOptionsFactory('user'),
    }),
    TransactionModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
