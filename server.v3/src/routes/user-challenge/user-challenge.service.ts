import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import * as moment from 'moment-timezone';
import { Challenge } from 'src/schemas/challenge.schema';
import { VerifyPhoto } from 'src/schemas/verify-photo.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserChallengeService {
  constructor(
    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,
    @InjectModel('Challenge') private challengeModel: Model<Challenge>,
    @InjectModel('VerifyPhoto') private verifyPhotoModel: Model<VerifyPhoto>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async registerMyChallenge(data: any) {
    const userChallengeInfo = await this.userChallengeModel.findOne({
      userId: data.userId,
      challengeId: data.challengeId,
      status: { $ne: 'completed' },
    });

    if (userChallengeInfo) {
      throw new HttpException(
        {
          error: 'My challenge already registered',
          depositInfo: {
            userChallengeId: userChallengeInfo._id,
            deposit: userChallengeInfo.deposit,
          },
        },

        HttpStatus.BAD_REQUEST,
      );
    }

    const challengeInfo = await this.challengeModel.findByIdAndUpdate(
      data.challengeId,
      {
        $inc: {
          participants: 1,
        },
      },
      { new: true },
    );

    const userInfo = await this.userModel.findById(data.userId);

    if (!challengeInfo || !userInfo) {
      throw new HttpException(
        { error: 'Challenge or user does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const period = challengeInfo.period;
    // const localTime = moment.tz(userInfo.timezone).add(1, 'days');
    const localTime = moment.tz(userInfo.timezone).startOf('day');
    const endTime = moment.tz(userInfo.timezone).add(period, 'days');

    const newUserChallenge = new this.userChallengeModel({
      challengeStartAt: localTime,
      challengeEndAt: endTime, //2 weeks
      status: 'not started',
      deposit: 0,
      completeNum: 0,
      successRate: 0,
      successStatus: false,
      isPhotoUploadedToday: false,
      cashPayback: 0,
      isPaybackPaid: false,
      profit: 0,
      userId: data.userId,
      challengeId: data.challengeId,
    });

    const newUserChallengeInfo = await newUserChallenge.save();

    return {
      message: 'My challenge registered',
      userChallengeInfo: {
        userChallengeId: newUserChallengeInfo._id,
      },
    };
  }

  async getAllMychallenge(userId: string, status: string) {
    const allUserChallengeInfo = (await this.userChallengeModel
      .find({ userId })
      .populate(['challengeId', 'userId'])) as any;

    const response = await Promise.all(
      allUserChallengeInfo.map(async (userChallenge) => {
        const now = moment().tz(userChallenge.userId.timezone);
        const isOngoing = now.isBetween(
          moment(userChallenge.challengeStartAt).startOf('day'),
          moment(userChallenge.challengeEndAt).endOf('day'),
          'day',
          '[]', // includes the start and end dates
        );
        let challengeStatus = '';
        if (
          now.isBefore(moment(userChallenge.challengeStartAt).startOf('day'))
        ) {
          challengeStatus = 'not started';
        } else {
          challengeStatus = isOngoing ? 'ongoing' : 'completed';
        }

        const today = moment()
          .tz(userChallenge.userId.timezone)
          .format('YYYY-MM-DD');
        const dayOfWeek = moment()
          .tz(userChallenge.userId.timezone)
          .format('ddd')
          .toUpperCase(); // 'SUN' to 'SAT'

        const isDayInAlarmWeek = userChallenge.alarmWeek.includes(dayOfWeek);
        const photoExists = await this.verifyPhotoModel.exists({
          userChallengeId: userChallenge._id,
          uploadedAt: today,
        });

        let isPhotoUploadedToday;
        if (challengeStatus !== 'ongoing') {
          isPhotoUploadedToday = true;
        } else {
          const photoUploadedToday =
            !isDayInAlarmWeek || (isDayInAlarmWeek && photoExists);

          isPhotoUploadedToday = photoUploadedToday ? true : false;
        }
        userChallenge.isPhotoUploadedToday = isPhotoUploadedToday;
        // Update the status in the database
        userChallenge.status = challengeStatus;
        await userChallenge.save();

        return {
          userChallengeId: userChallenge._id,
          challengeId: userChallenge.challengeId._id,
          status: challengeStatus,
          category: userChallenge.challengeId.category,
          participant: userChallenge.challengeId.participants,
          name: userChallenge.challengeId.name,
          successRate: userChallenge.successRate,
          thumbnailUrl: userChallenge.challengeId.thumbnailUrl,
          challengeStartAt: userChallenge.challengeStartAt,
          challengeEndAt: userChallenge.challengeEndAt,
          howTo: userChallenge.challengeId.howTo,
          description: userChallenge.challengeId.description,
          isPhotoUploadedToday: userChallenge.isPhotoUploadedToday,
          isViewResults: userChallenge.isViewResults,
        };
      }),
    );
    // Filter the response based on the query
    const filteredResponse = response.filter((challenge) => {
      if (!status) {
        return true;
      }
      return challenge.status === status;
    });

    return {
      message: 'My challenge found',
      userChallengeInfo: filteredResponse,
    };
  }

  async getChallenge(challengeId: string, userId: string) {
    const challengeInfo = await this.userChallengeModel.findOne({
      challengeId,
      userId,
    });

    return {
      message: 'User Challenge found',
      userChallengeInfo: {
        userChallengeId: challengeInfo._id,
      },
    };
  }

  async getMyStatus(userChallengeId: string) {
    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate(['challengeId', 'userId'])) as any;

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userChallengeInfos = (await this.userChallengeModel
      .find({
        challengeId: userChallengeInfo.challengeId,
      })
      .populate('userId')) as any;

    const profileUrls = userChallengeInfos
      .filter((userChallenge) => userChallenge.userId)
      .map((userChallenge) => userChallenge.userId.profileUrl);

    return {
      message: 'My status found',
      myStatus: {
        thumbnailUrl: userChallengeInfo.challengeId.thumbnailUrl,
        name: userChallengeInfo.challengeId.name,
        status: userChallengeInfo.status,
        profileUrls: profileUrls,
        participants: userChallengeInfo.challengeId.participants,
        challengeStartAt: userChallengeInfo.challengeStartAt,
        challengeEndAt: userChallengeInfo.challengeEndAt,
        verifyMethod: userChallengeInfo.challengeId.verifyMethod,
        frequency: userChallengeInfo.userFrequency,
        period: userChallengeInfo.userPeriod,
        successRate: userChallengeInfo.successRate,
        deposit: userChallengeInfo.deposit,
        profit: userChallengeInfo.profit,
        howTo: userChallengeInfo.challengeId.howTo,
        description: userChallengeInfo.challengeId.description,
        isPhotoUploadedToday: userChallengeInfo.isPhotoUploadedToday,
        isPaybackPaid: userChallengeInfo.isPaybackPaid,
        alarmTime: userChallengeInfo.alarmTime,
        week: userChallengeInfo.alarmWeek,
      },
    };
  }

  async getPayback(userChallengeId: string) {
    const userChallengeInfo =
      await this.userChallengeModel.findById(userChallengeId);

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Payback found',
      paybackInfo: {
        totalPayback: userChallengeInfo.deposit + userChallengeInfo.profit,
        deposit: userChallengeInfo.deposit,
        profit: userChallengeInfo.profit,
      },
    };
  }

  async getVerifyPhoto(userChallengeId: string) {
    const verifyPhotoInfo = (await this.verifyPhotoModel
      .find({ userChallengeId })
      .populate('userChallengeId')) as any;

    if (verifyPhotoInfo.length === 0) {
      throw new HttpException(
        { error: 'VerifyPhoto does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userInfo = await this.userModel.findById(
      verifyPhotoInfo[0].userChallengeId.userId,
    );

    const currentDate = moment().tz(userInfo.timezone).format('YYYY-MM-DD');

    const uploadedPhotos = verifyPhotoInfo.filter((photo) => {
      const createdAtDate = moment(photo.uploadedAt).format('YYYY-MM-DD');
      return createdAtDate === currentDate;
    });

    if (uploadedPhotos.length === 0) {
      throw new HttpException(
        { error: `Today's VerifyPhoto does not exist` },
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyPhotoIds = uploadedPhotos.map((photo) => photo._id);

    return {
      message: 'Verify photo found',
      verifyPhotoInfo: {
        verifyPhotoIds,
      },
    };
  }

  async deleteMyChallenge(userChallengeId: string) {
    const userChallengeInfo =
      await this.userChallengeModel.findByIdAndDelete(userChallengeId);

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'User Challenge deleted',
      userChallengeInfo: {
        userChallengeId,
      },
    };
  }

  async setViewResults(userChallengeId: string) {
    await this.userChallengeModel.findByIdAndUpdate(userChallengeId, {
      isViewResults: true,
    });

    return {
      message: 'View detail updated',
      userChallengeId,
    };
  }
}
