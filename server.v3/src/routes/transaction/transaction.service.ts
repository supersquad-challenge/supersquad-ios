import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { PushService } from '../push/push.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import { User } from '@sentry/node';
import { Challenge } from 'src/schemas/challenge.schema';
import * as moment from 'moment-timezone';
import { VerifyPhoto } from 'src/schemas/verify-photo.schema';

@Injectable()
export class TransactionService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  private tokenAddress = process.env.TOKEN_ADDRESS;

  constructor(
    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,

    @InjectModel('User')
    private userModel: Model<User>,

    @InjectModel('Challenge')
    private challengeModel: Model<Challenge>,

    @InjectModel('VerifyPhoto')
    private verifyPhotoModel: Model<VerifyPhoto>,

    private readonly pushService: PushService,
  ) {
    this.provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
    this.wallet = new ethers.Wallet(
      `0x${process.env.SERVER_KEY}`,
      this.provider,
    );
  }

  async getHello(): Promise<ethers.BigNumberish> {
    const balance = await this.provider.getBalance(this.wallet.address);

    return balance;
  }

  async depositCrypto(data: any) {
    const session = await this.challengeModel.db.startSession();
    session.startTransaction();
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: data.userId },
        { $set: { walletAddress: data.walletAddress } },
        { new: true },
      );

      if (!updatedUser) {
        throw new HttpException(
          { error: 'User does not exist' },
          HttpStatus.BAD_REQUEST,
        );
      }

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
            cryptoSuccessPool: data.deposit,
          },
        },
        { session, new: true },
      );

      const localTime = moment
        .tz(challengeInfo.startAt, updatedUser.timezone)
        .startOf('day');
      const endTime = moment
        .tz(challengeInfo.endAt, updatedUser.timezone)
        .endOf('day');

      const newUserChallenge = await new this.userChallengeModel({
        challengeStartAt: localTime,
        challengeEndAt: endTime,
        userPeriod: challengeInfo.period,
        userFrequency: challengeInfo.frequency,
        userTotalVerifyNum: challengeInfo.totalVerifyNum,
        status: 'not started',
        deposit: data.deposit,
        intentId: data.intentId,
        currency: 'usd',
        completeNum: 0,
        successRate: 0,
        successStatus: false,
        isPhotoUploadedToday: true,
        cashPayback: 0,
        isPaybackPaid: false,
        profit: 0,
        alarmWeek: data.isNotify
          ? ['MON', 'TUE', 'WED', 'THU', 'FRI']
          : undefined,
        userId: data.userId,
        challengeId: data.challengeId,
        isViewResults: false,
      }).save({ session });

      await session.commitTransaction();

      // //현재 등록 시간의 9분 후 첫 push 발생하도록 구현 (10분전 메시지와 중첩 X)
      // if (data.isNotify === true) {
      //   const time = new Date(data.time);
      //   time.setMinutes(time.getMinutes() + 9);

      //   await this.pushService.handlePushCron(
      //     newUserChallenge._id.toString(),
      //     data.deviceToken,
      //     time.toISOString(),
      //     data.week,
      //   );
      // }

      return {
        message: 'My challenge registered successfully',
        depositInfo: {
          userChallengeId: newUserChallenge._id,
          deposit: newUserChallenge.deposit,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async verifyCrypto(data: any) {
    const { challengeId, date } = data;

    const session = await this.challengeModel.db.startSession();
    session.startTransaction();

    try {
      const userChallengeInfo = (await this.userChallengeModel
        .find({ challengeId })
        .lean()
        .populate('challengeId')) as any;

      const slash =
        userChallengeInfo[0].challengeId.pledge /
        userChallengeInfo[0].challengeId.totalVerifyNum;

      const ids = userChallengeInfo.map((info) => info._id);
      console.log(ids);

      const verifyPhotoPromises = ids.map(async (id) => {
        const result = await this.verifyPhotoModel
          .find({
            userChallengeId: id,
            uploadedAt: date,
            checkResult: 'pass',
          })
          .lean();

        if (result.length > 0) {
          return [];
        }

        // 결과가 없는 경우, id만 포함한 객체를 반환
        return [{ _id: id }];
      });

      const verifyPhotoInfos = (await Promise.all(verifyPhotoPromises)).filter(
        (info) => info.length > 0,
      );

      console.log(verifyPhotoInfos);

      // const verifyPhotoIds = verifyPhotoInfos.flatMap((info) =>
      //   info.map((doc) => doc.userChallengeId),
      // );

      // console.log(verifyPhotoIds);

      let nonce = await this.provider.getTransactionCount(
        this.wallet.address,
        'pending',
      );

      const userChallengeResults = [];

      for (const id of verifyPhotoInfos) {
        const userChallenge = (await this.userChallengeModel
          .findById(id)
          .populate('challengeId')) as any;

        const challengeInfo = await this.challengeModel.findByIdAndUpdate(
          userChallenge.challengeId,
          {
            $inc: {
              cryptoFailPool: slash,
              cryptoSuccessPool: -slash,
            },
          },
          { session, new: true },
        );

        const amountInWei = ethers.parseUnits(slash.toString(), 6);

        const receipt = await this.transferToken(
          this.tokenAddress,
          userChallenge.challengeId.addressSuccessPool,
          userChallenge.challengeId.addressFailPool,
          amountInWei,
          nonce,
        );

        nonce++;

        userChallengeResults.push({
          slash,
          userId: userChallenge.userId,
        });
      }

      await session.commitTransaction();

      return {
        message: 'My challenge verified successfully',
        results: userChallengeResults,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getTokenBalance(
    tokenAddress: string,
    userAddress: string,
  ): Promise<ethers.BigNumberish> {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      [
        // ERC20 interface
        'function balanceOf(address owner) view returns (uint256)',
      ],
      this.provider,
    );
    const balance = await tokenContract.balanceOf(userAddress);
    return balance;
  }

  async transferToken(
    tokenAddress: string,
    fromAddress: string,
    toAddress: string,
    amount: ethers.BigNumberish,
    nonce: number, // Add nonce as a parameter
  ): Promise<ethers.TransactionResponse> {
    const dynamicPoolContract = new ethers.Contract(
      fromAddress,
      [
        // contract interface
        'function transferToToken(address _token, address _to, uint256 _amount) external returns (bool)',
      ],
      this.wallet,
    );

    // Create a transaction object
    const tx = {
      to: fromAddress,
      data: dynamicPoolContract.interface.encodeFunctionData(
        'transferToToken',
        [tokenAddress, toAddress, amount],
      ),
      nonce: nonce,
    };

    // Send the transaction
    const transaction = await this.wallet.sendTransaction(tx);

    return transaction;
  }

  async setResult(data: any) {
    const { challengeId } = data;

    const userChallengeInfo = await this.userChallengeModel.find({
      challengeId,
      successRate: 100,
      // status: 'completed',
    });

    console.log(userChallengeInfo);

    const userIds = userChallengeInfo.map((info) => info.userId);
    let randomUserId;

    if (userIds.length === 0) {
      randomUserId = 'noWinner';
    } else {
      const randomIndex = Math.floor(Math.random() * userIds.length);
      randomUserId = userIds[randomIndex];
    }

    const challengeInfo = await this.challengeModel.findByIdAndUpdate(
      challengeId,
      { $set: { winnerId: randomUserId } },
      { new: true },
    );

    return randomUserId;
  }

  async viewResults(userChallengeId: string) {
    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate('challengeId')) as any;

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    let raffle: number;
    let totalReward: number;
    const isWinner =
      userChallengeInfo.userId === userChallengeInfo.challengeId.winnerId;
    if (isWinner) {
      raffle = userChallengeInfo.challengeId.cryptoFailPool;
      totalReward = userChallengeInfo.deposit + raffle;
    } else {
      raffle = 0;
      totalReward = userChallengeInfo.deposit;
    }

    return {
      message: 'View results successfully',
      userChallengeInfo: {
        userChallengeId: userChallengeInfo._id,
        pledge: userChallengeInfo.deposit,
        isWinner,
        raffle,
        totalReward,
      },
    };
  }

  async claimCrypto(userChallengeId: string) {
    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate('challengeId')) as any;

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User Challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userChallengeModel.findByIdAndUpdate(
      userChallengeId,
      {
        $set: { isPaybackPaid: true },
      },
      { new: true },
    );

    let nonce = await this.provider.getTransactionCount(
      this.wallet.address,
      'pending',
    );

    let payback: number;
    let reward: number;
    if (userChallengeInfo.successRate > 0) {
      const challengeInfo = await this.challengeModel.findByIdAndUpdate(
        userChallengeInfo.challengeId,
        {
          $inc: {
            cryptoSuccessPool: -(
              (userChallengeInfo.deposit * userChallengeInfo.successRate) /
              100
            ),
          },
        },
      );

      payback =
        (userChallengeInfo.deposit * userChallengeInfo.successRate) / 100;

      const amountInWeiDeposit = ethers.parseUnits(
        userChallengeInfo.challengeId.cryptoFailPool.toString(),
        6,
      );

      await this.transferToken(
        this.tokenAddress,
        userChallengeInfo.challengeId.addressSuccessPool,
        userChallengeInfo.walletAddress,
        amountInWeiDeposit,
        nonce,
      );

      nonce++;
    } else {
      return {
        message: 'You have no payback to claim',
        payback: 0,
      };
    }

    const isWinner =
      userChallengeInfo.userId === userChallengeInfo.challengeId.winnerId;
    if (isWinner) {
      const challengeInfo = await this.challengeModel.findByIdAndUpdate(
        userChallengeInfo.challengeId,
        {
          $inc: {
            cryptoFailPool: -userChallengeInfo.challengeId.cryptoFailPool,
          },
        },
      );

      reward = userChallengeInfo.challengeId.cryptoFailPool;

      const amountInWeiRaffle = ethers.parseUnits(
        userChallengeInfo.challengeId.cryptoFailPool.toString(),
        6,
      );

      await this.transferToken(
        this.tokenAddress,
        userChallengeInfo.challengeId.addressFailPool,
        userChallengeInfo.walletAddress,
        amountInWeiRaffle,
        nonce,
      );
    }

    return {
      message: 'Claim crypto successfully',
      payback,
      reward,
    };
  }
}
