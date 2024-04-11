import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from 'src/schemas/challenge.schema';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import { User } from 'src/schemas/user.schema';
import axios from 'axios';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class DevelopService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Challenge') private challengeModel: Model<Challenge>,
    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,
    private readonly transactionService: TransactionService,
  ) {}

  async getAllUser() {
    const userInfo = await this.userModel.find();

    if (userInfo.length === 0) {
      throw new HttpException(
        { error: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUserInfo = userInfo.map((user) => {
      const { _id, ...otherProps } = user.toObject();
      return { userId: _id, ...otherProps };
    });

    return updatedUserInfo;
  }

  async deleteUserById(userId: string) {
    const userInfo = await this.userModel.findByIdAndDelete(userId);

    if (!userInfo) {
      throw new HttpException(
        { error: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return userInfo;
  }

  async deleteChallengeById(challengeId: string) {
    const challengeInfo = (await this.challengeModel.findByIdAndDelete(
      challengeId,
    )) as any;

    if (!challengeInfo) {
      throw new HttpException(
        { error: 'Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Challenge deleted',
      challengeInfo: {
        challengeId: challengeInfo._id,
        challengeName: challengeInfo.name,
      },
    };
  }

  async deleteUserChallengeById(userChallengeId: string) {
    const userChallengeInfo =
      await this.userChallengeModel.findByIdAndDelete(userChallengeId);

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return userChallengeInfo;
  }

  async savePushToken(deviceToken: string) {
    // console.log(deviceToken);

    return {
      message: 'A device Token is received',
      deviceToken,
    };
  }

  private readonly serverKey = process.env.FIREBASE_SERVER_KEY;
  async sendPushMessage(data: any) {
    const response = await axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${this.serverKey}`,
      },
      data: {
        to: data.deviceToken,
        notification: {
          android: { channelId: 'Alarm' },
          title: data.title,
          body: data.message,
        },
        priority: 'high',
      },
    });

    return response.data;
  }

  verifyCryptoChallenge(data: any) {
    return this.transactionService.verifyCrypto(data);
  }

  setWinner(data: any) {
    return this.transactionService.setResult(data);
  }
}
