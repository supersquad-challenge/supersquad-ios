import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as moment from 'moment-timezone';
import { VerifyPhoto } from 'src/schemas/verify-photo.schema';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import { PushService } from '../push/push.service';

@Injectable()
export class VerifyService {
  constructor(
    @InjectModel('VerifyPhoto')
    private verifyPhotoModel: Model<VerifyPhoto>,
    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,
    private readonly pushService: PushService,
  ) {}

  async postPhoto(data: any, file: any) {
    const { userChallengeId } = data;
    const { location } = file;

    const yymmdd = moment().format('YYYY-MM-DD');

    const newVerifyPhoto = new this.verifyPhotoModel({
      userChallengeId,
      photoUrl: location,
      uploadedAt: yymmdd,
      checkStatus: 'notChecked',
      checkResult: 'pass',
    });

    await newVerifyPhoto.save();

    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate('challengeId')) as any;

    const completeNum = userChallengeInfo.completeNum + 1;

    const successRate = Math.floor(
      (completeNum / userChallengeInfo.userTotalVerifyNum) * 100,
    );

    const updatedUserChallenge =
      await this.userChallengeModel.findByIdAndUpdate(
        userChallengeId,
        {
          $set: {
            completeNum,
            successRate,
          },
        },
        { new: true },
      );

    return {
      message: 'photo uploaded',
      verifyPhotoInfo: {
        verifyPhotoId: newVerifyPhoto._id,
        photoUrl: newVerifyPhoto.photoUrl,
        uploadedAt: newVerifyPhoto.uploadedAt,
        checkStatus: newVerifyPhoto.checkStatus,
      },
    };
  }

  async verifyChallenge(data: any) {
    const { userChallengeId, date, verifyStatus } = data;

    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate(['challengeId', 'userId'])) as any;

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    let completeNum = 0;
    if (verifyStatus === 'fail') {
      completeNum = userChallengeInfo.completeNum - 1;
    } else if (verifyStatus === 'pass') {
      completeNum = userChallengeInfo.completeNum + 1;
    } else {
      throw new HttpException(
        { error: 'Verify status is not valid' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const successRate = Math.floor(
      (completeNum / userChallengeInfo.userTotalVerifyNum) * 100,
    );

    const updatedUserChallenge =
      await this.userChallengeModel.findByIdAndUpdate(
        userChallengeId,
        {
          $set: {
            completeNum,
            successRate,
          },
          [`verifyStatus.${date.toString()}`]: verifyStatus,
        },
        { new: true },
      );

    await this.pushService.manualPush(
      userChallengeId,
      userChallengeInfo.userId.deviceToken,
    );

    return {
      message: 'Challenge verified',
      userChallengeInfo: {
        userChallengeId: updatedUserChallenge._id,
        successRate: updatedUserChallenge.successRate,
        completeNum: updatedUserChallenge.completeNum,
        verifyStatus: updatedUserChallenge.verifyStatus,
      },
    };
  }

  async getAllPhotos(userChallengeId: string) {
    const verifyPhotoInfo = await this.verifyPhotoModel.find({
      userChallengeId,
    });

    if (verifyPhotoInfo.length === 0) {
      // throw new HttpException(
      //   { error: 'Verification photo does not exist' },
      //   HttpStatus.BAD_REQUEST,
      // );
      return {
        message: 'Verification photo not found',
      };
    }

    return {
      message: 'Verification photo found',
      verifyPhotoInfo: verifyPhotoInfo.map((photo) => ({
        verifyPhotoId: photo._id,
        photoUrl: photo.photoUrl,
        uploadedAt: photo.uploadedAt,
        checkStatus: photo.checkStatus,
        userChallengeId: photo.userChallengeId,
      })),
    };
  }
}
