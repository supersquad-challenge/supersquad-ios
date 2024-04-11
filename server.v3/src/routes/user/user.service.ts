import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signup(file: any, data: any) {
    const location = file?.location;

    const existUser = await this.userModel.findById(data.userId);

    if (existUser) {
      throw new HttpException(
        { error: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userInfo = new this.userModel({
      _id: data.userId,
      ...data,
      profileUrl: location ? location : data.profileUrl,
    });
    await userInfo.save(); // firebase UserId를 _id로 사용

    return {
      userId: userInfo.id,
      nickname: userInfo.nickname,
      profileUrl: userInfo.profileUrl,
    };
  }

  async registerUserName(file: any, data: any) {
    const { userId, nickname, isNull } = data;

    let location;
    if (isNull) {
      location = '';
    } else {
      location = file?.location;
    }

    const userInfo = await this.userModel.findByIdAndUpdate(
      userId,
      { nickname, profileUrl: location },
      { new: true },
    );

    if (!userInfo) {
      throw new HttpException(
        { error: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      userId: userInfo.id,
      nickname: userInfo.nickname,
      profileUrl: userInfo.profileUrl,
    };
  }

  async getUserInfo(userId: string) {
    const userInfo = await this.userModel.findById(userId);

    if (!userInfo) {
      throw new HttpException(
        { error: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      userId: userInfo._id,
      email: userInfo.email,
      profileUrl: userInfo.profileUrl,
      nickname: userInfo.nickname,
      walletAddress: userInfo.walletAddress,
    };
  }

  async removeUser(userId: string) {
    const userInfo = (await this.userModel.findByIdAndDelete(userId)) as any;

    if (!userInfo) {
      throw new HttpException(
        { error: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      userId: userInfo._id,
      email: userInfo.email,
      profileUrl: userInfo.profileUrl,
      nickname: userInfo.nickname,
    };
  }
}
