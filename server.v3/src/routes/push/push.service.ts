import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment-timezone';
import { InjectModel } from '@nestjs/mongoose';
import { UserChallenge } from 'src/schemas/user-challenge.schema';
import { Notification } from 'src/schemas/notification.schema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Agenda } from 'agenda';

@Injectable()
export class PushService {
  private agenda: Agenda;

  private jobMessages = {
    before: {
      title: '10 Minutes Left ⏰',
      body: 'Just 10 minutes left! Tap to upload proof.',
    },
    onTime: {
      title: 'Urgent Reminder 🚨',
      body: `Prove it, or lose it. Never let your pledge slip by!`,
    },
    after: {
      title: 'Final Call ✨',
      body: 'You can still make it. Our last call!',
    },
  };

  constructor(
    @InjectModel('UserChallenge')
    private userChallengeModel: Model<UserChallenge>,

    @InjectModel('Notification')
    private notificationModel: Model<Notification>,

    @InjectModel('User')
    private userModel: Model<User>,
  ) {
    const mongoUrl = process.env.MONGODB_FULL;
    this.agenda = new Agenda({
      db: {
        address: mongoUrl,
      },
    });
  }

  async getAllPush(userId: string) {
    const notificationInfos = await this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 });

    // if (!notificationInfos) {
    //   return { message: 'Notification does not exist' };
    // }

    return notificationInfos.map((notificationInfo) => ({
      title: notificationInfo.title,
      body: notificationInfo.body,
      message_id: notificationInfo.message_id,
      createdAt: notificationInfo.createdAt,
    }));
  }

  async deleteAllPush(userId: string) {
    const notificationInfos = await this.notificationModel.find({ userId });

    // if (notificationInfos.length === 0) {
    //   throw new HttpException(
    //     { error: 'Notification does not exist' },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    await this.notificationModel.deleteMany({ userId });

    return { message: 'All notification deleted' };
  }

  private readonly serverKey = process.env.FIREBASE_SERVER_KEY;
  private deviceToken: string;
  async testSendPushNotification(deviceToken: string) {
    // const response = await axios({
    //   method: 'post',
    //   url: 'https://fcm.googleapis.com/fcm/send',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `key=${this.serverKey}`,
    //   },
    //   data: {
    //     to: deviceToken,
    //     notification: {
    //       android: { channelId: 'Alarm' },
    //       title: '22222',
    //       body: '테스트',
    //     },
    //     priority: 'high',
    //   },
    // });

    // return response.data;

    return { message: 'deviceToken' };
  }

  async manualPush(userChallengeId: string, deviceToken: string) {
    const userChallengeInfo = (await this.userChallengeModel
      .findById(userChallengeId)
      .populate('challengeId')) as any;

    const response = await axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${this.serverKey}`,
      },
      data: {
        to: deviceToken,
        notification: {
          android: { channelId: 'alarm' },
          title: `${userChallengeInfo.challengeId.name} : False Proof Alert 🚨`,
          body: 'Please review your upload. Success rate adjusted.',
        },
        priority: 'high',
      },
    });

    const notificationInfo = await this.notificationModel.create({
      title: `${userChallengeInfo.challengeId.name} : False Proof Alert 🚨`,
      body: 'Please review your upload. Success rate adjusted.',
      userChallengeId,
      userId: userChallengeInfo.userId,
      message_id: response.data.results[0].message_id,
    });

    return response.data;
  }

  async handlePushCron(
    userChallengeId: string,
    deviceToken: string,
    time: string,
    week?: string[],
  ) {
    this.deviceToken = deviceToken;

    let updateObject = {
      $set: {
        alarmTime: time,
      },
    };

    if (week) {
      updateObject.$set['alarmWeek'] = week;
    }

    const userChallengeInfo = await this.userChallengeModel.findByIdAndUpdate(
      userChallengeId,
      updateObject,
      { new: true },
    );

    if (!userChallengeInfo) {
      throw new HttpException(
        { error: 'User challenge does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userModel.findByIdAndUpdate(userChallengeInfo.userId, {
      $set: {
        deviceToken: deviceToken,
      },
    });

    const challengeStartAt = moment
      .utc(userChallengeInfo.challengeStartAt)
      .startOf('day');
    const challengeEndAt = moment
      .utc(userChallengeInfo.challengeEndAt)
      .endOf('day');

    const dayMapping = {
      SUN: 0,
      MON: 1,
      TUE: 2,
      WED: 3,
      THU: 4,
      FRI: 5,
      SAT: 6,
    };

    const parsedTime = moment(time);

    const days = userChallengeInfo.alarmWeek.map(
      (day) => dayMapping[day.toUpperCase()],
    );

    // Cron 표현식을 생성
    const cronExpressionBefore10 = `0 ${parsedTime
      .clone()
      .subtract(10, 'minutes')
      .minute()} ${parsedTime.hour()} * * ${days.join(',')}`;

    const cronExpression = `0 ${parsedTime.minute()} ${parsedTime.hour()} * * ${days.join(
      ',',
    )}`;

    const cronExpressionAfter5 = `0 ${parsedTime
      .clone()
      .add(5, 'minutes')
      .minute()} ${parsedTime.hour()} * * ${days.join(',')}`;

    // Cron 작업 등록
    this.scheduleCronJob(
      cronExpressionBefore10,
      cronExpression,
      cronExpressionAfter5,
      challengeStartAt,
      challengeEndAt,
      userChallengeId,
    );

    return 'Cron job scheduled';
  }

  async defineJob(
    jobName: string,
    userChallengeId: string,
    deviceToken: string,
  ) {
    this.agenda.define(jobName, async () => {
      const userChallengeInfo = (await this.userChallengeModel
        .findById(userChallengeId)
        .populate(['challengeId', 'userId'])) as any;

      if (!userChallengeInfo.isPhotoUploadedToday) {
        const jobType = jobName.split('-')[1]; // 'before', 'onTime', 'after'
        const response = await this.sendPushNotification(
          `${userChallengeInfo.challengeId.name} : ${this.jobMessages[jobType].title}`,
          this.jobMessages[jobType].body,
          deviceToken,
        );

        const notificationInfo = await this.notificationModel.create({
          title: `${userChallengeInfo.challengeId.name} : ${this.jobMessages[jobType].title}`,
          body: this.jobMessages[jobType].body,
          userChallengeId: userChallengeId,
          userId: userChallengeInfo.userId,
          message_id: response.results[0].message_id,
        });

        await notificationInfo.save();
      }
    });
  }

  async onModuleInit() {
    this.agenda.on('ready', async () => {
      const jobs = await this.agenda.jobs({});
      const jobDetails = jobs.map((job) => ({
        name: job.attrs.name,
        userChallengeId: job.attrs.data.userChallengeId,
        deviceToken: job.attrs.data.deviceToken,
      }));

      const jobTypes = ['before', 'onTime', 'after'];

      for (const jobType of jobTypes) {
        const filteredJobs = jobDetails.filter((job) =>
          job.name.includes(jobType),
        );

        filteredJobs.forEach(async (job) => {
          await this.defineJob(job.name, job.userChallengeId, job.deviceToken);
        });
      }
    });

    await this.agenda.start();
  }

  async scheduleCronJob(
    cronExpressionBefore: string,
    cronExpression: string,
    cronExpressionAfter: string,
    challengeStartAt: moment.Moment,
    challengeEndAt: moment.Moment,
    userChallengeId: string,
  ) {
    const jobDetails = [
      { time: cronExpressionBefore, name: `${userChallengeId}-before` },
      { time: cronExpression, name: `${userChallengeId}-onTime` },
      { time: cronExpressionAfter, name: `${userChallengeId}-after` },
    ];

    const jobOptions = {
      startDate: challengeStartAt.toDate(),
      endDate: challengeEndAt.toDate(),
    };

    for (const job of jobDetails) {
      await this.agenda.every(
        job.time,
        job.name,
        { userChallengeId, deviceToken: this.deviceToken },
        jobOptions,
      );

      await this.defineJob(job.name, userChallengeId, this.deviceToken);
    }
    await this.agenda.start();
  }

  async sendPushNotification(
    pushTitle: string,
    pushBody: string,
    deviceToken: string,
  ) {
    if (!deviceToken) {
      return;
    }

    const response = await axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${this.serverKey}`,
      },
      data: {
        to: deviceToken,
        notification: {
          android: { channelId: 'alarm' },
          title: pushTitle,
          body: pushBody,
        },
        priority: 'high',
        // android: {
        //   priority: 'high',
        // },

        //   apns: {
        //     payload: {
        //       aps: {
        //         contentAvailable: true,
        //       },
        //     },
        //   },
        // },
      },
    });

    return response.data;
  }
}
