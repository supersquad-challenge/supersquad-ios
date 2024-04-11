import { User } from 'src/schemas/user.schema';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { MODULE_OPTIONS_TOKEN } from './stripe.module-definition';
import { StripeModuleOptions } from './stripeOptions.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import { Challenge } from 'src/schemas/challenge.schema';
import * as moment from 'moment-timezone';
import { PushService } from '../push/push.service';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: StripeModuleOptions,

    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,

    @InjectModel('User')
    private userModel: Model<User>,

    @InjectModel('Challenge')
    private challengeModel: Model<Challenge>,

    private readonly pushService: PushService,
  ) {
    this.stripe = new Stripe(this.options.apiKey, this.options.options);
  }

  async getCustomers(id?: string) {
    if (id && id !== '{id}') {
      return await this.stripe.customers.retrieve(id);
    } else {
      return await this.stripe.customers.list();
    }
  }

  async createCustomer(email: string) {
    return await this.stripe.customers.create({ email });
  }

  async getProducts() {
    return await this.stripe.products.list();
  }

  async getBalance() {
    return await this.stripe.balance.retrieve();
  }

  async retrievePaymentMethods(id: string) {
    const paymentMethodList = await this.stripe.customers.listPaymentMethods(
      id,
      {
        limit: 1,
      },
    );

    return paymentMethodList;
  }

  async attachPaymentMethod(data: any) {
    const { customer, paymentMethod: pid } = data;

    const paymentMethod = await this.stripe.paymentMethods.attach(pid, {
      customer: customer,
    });

    return paymentMethod;
  }

  async confirmPaymentIntent(data: any) {
    const { paymentIntentId: piid, paymentMethod: pmid } = data;

    const paymentIntent = await this.stripe.paymentIntents.confirm(piid, {
      payment_method: pmid,
    });

    return paymentIntent;
  }

  getApiKey() {
    return process.env.STRIPE_PUBLISHABLE_API_KEY;
  }

  async detachPaymentMethod(paymentMethodId: string) {
    await this.stripe.paymentMethods.detach(paymentMethodId);

    return {
      message: 'Payment method detached successfully',
    };
  }

  async paymentIntent(id: string, amount: number) {
    if (amount < 50) {
      throw new HttpException(
        { error: 'Amount must be greater than 50 cents' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const customer = await this.stripe.customers.retrieve(id);

    const params = {
      amount: amount,
      currency: 'usd',
      customer: customer.id,
      // payment_method_options: {
      //   card: {
      //     request_three_d_secure: 'automatic',
      //   },
      // },
      payment_method_types: ['card'],
    };
    try {
      const paymentIntent = await this.stripe.paymentIntents.create(params);

      // 클라이언트에서는 PaymentIntentId만 사용함.
      return {
        message: 'Payment intent created successfully',
        paymentIntent,
      };
    } catch (error) {
      return {
        error: error.raw.message,
      };
    }
  }

  async refundPayment(userId: string) {
    const userChallengeInfo = await this.userChallengeModel.find({
      userId,
      status: 'completed',
      isPaybackPaid: false,
    });

    await this.userChallengeModel.updateMany(
      { userId, status: 'completed', isPaybackPaid: false },
      { $set: { isPaybackPaid: true } },
    );

    // console.log(userChallengeInfo);

    const refundInfos = [];
    for (const info of userChallengeInfo) {
      const refundAmount = Math.floor(info.deposit * info.successRate);
      await this.userChallengeModel.findByIdAndUpdate(info._id, {
        cashPayback: refundAmount / 100,
      });

      if (refundAmount > 50) {
        const refundInfo = await this.stripe.refunds.create({
          payment_intent: info.intentId,
          amount: refundAmount,
        });

        refundInfos.push(refundInfo);
      }
    }

    // console.log(refundInfos);
    return refundInfos;
  }

  async getRefund(intentId: string) {
    return await this.stripe.refunds.retrieve(intentId);
  }

  async getPaymentIntent(intentId: string) {
    if (intentId && intentId !== '{intentId}') {
      return await this.stripe.paymentIntents.retrieve(intentId);
    } else {
      return await this.stripe.paymentIntents.list();
    }
  }

  async depositChallenge(data: any) {
    const session = await this.challengeModel.db.startSession();
    session.startTransaction();
    try {
      const userInfo = await this.userModel.findById(data.userId);

      if (!userInfo) {
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

      let localTime: moment.Moment, endTime: moment.Moment;
      if (data.startDay === 'Today') {
        localTime = moment.tz(userInfo.timezone).startOf('day');
        endTime = moment.tz(userInfo.timezone).add(data.period - 1, 'days');
      } else {
        localTime = moment.tz(userInfo.timezone).add(1, 'days');
        endTime = moment.tz(userInfo.timezone).add(data.period, 'days');
      }

      await this.challengeModel.findByIdAndUpdate(
        data.challengeId,
        {
          $inc: {
            participants: 1,
            cashSuccessPool: data.deposit / 100,
          },
        },
        { session, new: true },
      );

      console.log(data);

      const newUserChallenge = await new this.userChallengeModel({
        challengeStartAt: localTime,
        challengeEndAt: endTime,
        userPeriod: data.period,
        userFrequency: data.frequency,
        userTotalVerifyNum:
          (data.period === 1 ? 1 : data.period / 7) * data.frequency,
        status: 'ongoing',
        deposit: data.deposit / 100,
        intentId: data.intentId,
        currency: 'usd',
        completeNum: 0,
        successRate: 0,
        successStatus: false,
        isPhotoUploadedToday: true,
        cashPayback: 0,
        isPaybackPaid: false,
        profit: 0,
        alarmWeek: data.week,
        userId: data.userId,
        challengeId: data.challengeId,
        isViewResults: false,
      }).save({ session });

      await session.commitTransaction();

      //현재 등록 시간의 9분 후 첫 push 발생하도록 구현 (10분전 메시지와 중첩 X)
      if (data.isNotify === true) {
        const time = new Date(data.time);
        time.setMinutes(time.getMinutes() + 9);

        await this.pushService.handlePushCron(
          newUserChallenge._id.toString(),
          data.deviceToken,
          time.toISOString(),
          data.week,
        );
      }

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

  async getAllPayment(userId: string) {
    const userChallengeInfo = (await this.userChallengeModel
      .find({ userId })
      .populate(['challengeId', 'userId'])) as any;

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = userChallengeInfo
      .filter((info) => info.isPaybackPaid === false)
      .map((info) => ({
        userChallengeId: info._id,
        createdAt: info.challengeStartAt,
        challengeName: info.challengeId.name,
        deposit:
          info.status === 'completed'
            ? Math.floor(info.deposit * info.successRate * 0.01)
            : info.deposit,
        status: info.status,
      }));

    return {
      message: 'Get all payment',
      response,
    };
  }
}
