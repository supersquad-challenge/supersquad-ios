import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { PushService } from './push.service';
import { ApiTags } from '@nestjs/swagger';
import {
  DeviceTokenReqDto,
  SetPushReqDto,
  manualPushReqDto,
} from './dto/req.dto';
import { UserIdReqDto } from 'src/common/req.dto';

@ApiTags('push')
@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('test')
  testSendPushNotification(@Body() { deviceToken }: DeviceTokenReqDto) {
    return this.pushService.testSendPushNotification(deviceToken);
  }

  @Post('manual')
  manualPush(@Body() { userChallengeId, deviceToken }: manualPushReqDto) {
    return this.pushService.manualPush(userChallengeId, deviceToken);
  }

  @Post('schedule')
  handlePushCron(
    @Body() { userChallengeId, deviceToken, time, week }: SetPushReqDto,
  ) {
    return this.pushService.handlePushCron(
      userChallengeId,
      deviceToken,
      time,
      week,
    );
  }

  @Get('allPush/:userId')
  getAllPush(@Param() { userId }: UserIdReqDto) {
    return this.pushService.getAllPush(userId);
  }

  @Delete('allPush/:userId')
  deleteAllPush(@Param() { userId }: UserIdReqDto) {
    return this.pushService.deleteAllPush(userId);
  }
}
