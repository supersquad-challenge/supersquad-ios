import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from 'src/schemas/challenge.schema';
import { Model } from 'mongoose';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import * as moment from 'moment-timezone';
import { VerifyPhoto } from 'src/schemas/verify-photo.schema';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge') private challengeModel: Model<Challenge>,
    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,
    @InjectModel('VerifyPhoto')
    private verifyModel: Model<VerifyPhoto>,
  ) {}

  async createChallenge(data: any, file: any) {
    const { location } = file;

    const existingChallenge = await this.challengeModel.findOne({
      name: data.name,
    });

    if (existingChallenge) {
      throw new HttpException(
        { error: 'Challenge already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newData = {
      ...data,
      thumbnailUrl: location,
    };

    const newChallenge = new this.challengeModel(newData);
    const savedChallenge = await newChallenge.save();

    return {
      message: 'Challenge created',
      challengeInfo: {
        challengeId: savedChallenge._id,
        name: savedChallenge.name,
      },
    };
  }

  async checkMyChallenge(challengeId: string, userId: string) {
    const userChallengeInfo = await this.userChallengeModel.findOne({
      userId,
      challengeId,
      status: { $ne: 'completed' },
    });

    if (!userChallengeInfo) {
      return { message: 'My challenge not found' };
    }

    return { message: 'My challenge found' };
  }

  async getChallengeAll(query: any) {
    let filter = {};
    if (query.q) {
      filter = { $text: { $search: query.q } };
    } else if (query.category) {
      filter = { category: query.category };
    }

    const challengeInfo = await this.challengeModel
      .find(filter)
      .sort({ createdAt: -1 });

    // if (challengeInfo.length === 0) {
    //   throw new HttpException(
    //     { error: 'Challenge does not exist' },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const response = challengeInfo.map((challenge) => ({
      challengeId: challenge._id,
      category: challenge.category,
      name: challenge.name,
      thumbnailUrl: challenge.thumbnailUrl,
      participants: challenge.participants,
      period: challenge.period,
      startAt: challenge.startAt,
      endAt: challenge.endAt,
    }));

    return {
      message: 'Challenge found',
      challengeInfo: response,
    };
  }

  async getChallengeById(challengeId: string, userId?: string) {
    const challengeInfo = await this.challengeModel.findById(challengeId);

    if (!challengeInfo) {
      throw new HttpException(
        { error: 'Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userChallengeInfo = await this.userChallengeModel.findOne({
      userId: userId,
      challengeId: challengeId,
      status: { $ne: 'completed' },
    });

    return {
      message: 'Challenge found',
      challengeInfo: {
        challengeId: challengeInfo._id,
        thumbnailUrl: challengeInfo.thumbnailUrl,
        name: challengeInfo.name,
        frequency: challengeInfo.frequency,
        period: challengeInfo.period,
        participants: challengeInfo.participants,
        totalVerifyNum: challengeInfo.totalVerifyNum,
        howTo: challengeInfo.howTo,
        description: challengeInfo.description,
        userChallengeId: userChallengeInfo ? userChallengeInfo._id : null,
        depositMethod: challengeInfo.depositMethod,
        pledge: challengeInfo.pledge,
        startAt: challengeInfo.startAt,
        endAt: challengeInfo.endAt,
        cryptoSuccessPool: challengeInfo.cryptoSuccessPool,
        cryptoFailPool: challengeInfo.cryptoFailPool,
        addressSuccessPool: challengeInfo.addressSuccessPool,
        addressFailPool: challengeInfo.addressFailPool,
      },
    };
  }

  async getChallengeByUserChallengeId(userChallengeId: string) {
    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate(['challengeId', 'userId'])) as any;

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // const today = moment()
    //   .tz(userChallengeInfo.userId.timezone)
    //   .format('YYYY-MM-DD');
    // const photoUploadedToday = await this.verifyModel.exists({
    //   userChallengeId: userChallengeInfo._id,
    //   uploadedAt: today,
    // });

    const today = moment()
      .tz(userChallengeInfo.userId.timezone)
      .format('YYYY-MM-DD');
    const dayOfWeek = moment()
      .tz(userChallengeInfo.userId.timezone)
      .format('ddd')
      .toUpperCase(); // 'SUN' to 'SAT'

    const isDayInAlarmWeek = userChallengeInfo.alarmWeek.includes(dayOfWeek);
    const photoExists = await this.verifyModel.exists({
      userChallengeId: userChallengeInfo._id,
      uploadedAt: today,
    });

    let isPhotoUploadedToday;
    if (userChallengeInfo.status !== 'ongoing') {
      isPhotoUploadedToday = true;
    } else {
      const photoUploadedToday =
        !isDayInAlarmWeek || (isDayInAlarmWeek && photoExists);

      isPhotoUploadedToday = photoUploadedToday ? true : false;
    }

    const updatedUserChallengeInfo =
      await this.userChallengeModel.findByIdAndUpdate(
        userChallengeId,
        {
          isPhotoUploadedToday,
        },
        { new: true },
      );

    return {
      message: 'Challenge found',
      userChallengeInfo: {
        userChallengeId: userChallengeInfo._id,
        challengeId: userChallengeInfo.challengeId._id,
        category: userChallengeInfo.challengeId.category,
        name: userChallengeInfo.challengeId.name,
        thumbnailUrl: userChallengeInfo.challengeId.thumbnailUrl,
        participants: userChallengeInfo.challengeId.participants,
        deposit: userChallengeInfo.deposit,
        profit: userChallengeInfo.profit,
        successRate: userChallengeInfo.successRate,
        frequency: userChallengeInfo.userFrequency,
        period: userChallengeInfo.userPeriod,
        week: userChallengeInfo.alarmWeek,
        status: userChallengeInfo.status,
        verifyMethod: userChallengeInfo.challengeId.verifyMethod,
        isPhotoUploadedToday: updatedUserChallengeInfo.isPhotoUploadedToday,
        howTo: userChallengeInfo.challengeId.howTo,
        description: userChallengeInfo.challengeId.description,
        challengeStartAt: userChallengeInfo.challengeStartAt,
        challengeEndAt: userChallengeInfo.challengeEndAt,
        depositMethod: userChallengeInfo.challengeId.depositMethod,
        cryptoSuccessPool: userChallengeInfo.challengeId.cryptoSuccessPool,
        cryptoFailPool: userChallengeInfo.challengeId.cryptoFailPool,
        viewResultActivated: !!userChallengeInfo.challengeId.winnerId,
      },
    };
  }

  async getChallengeCategory() {
    const challengeCategory = await this.challengeModel.find();
    const categoryCounts = challengeCategory.reduce((counts, challenge) => {
      const category = challenge.category;
      if (!counts[category]) {
        counts[category] = 0;
      }
      counts[category]++;
      return counts;
    }, {});

    const totalCount = Object.values(categoryCounts).reduce(
      (a: number, b: number) => a + b,
      0,
    );

    return {
      message: 'Category found',
      categoryCounts: {
        ...categoryCounts,
        All: totalCount,
      },
    };
  }
}
