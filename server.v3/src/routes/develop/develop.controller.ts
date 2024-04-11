import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DevelopService } from './develop.service';
import { ApiTags } from '@nestjs/swagger';
import { DeviceTokenReqDto, PushMessageReqDto } from './dto/req.dto';
import {
  SetResultReqDto,
  VerifyCryptoReqDto,
} from '../transaction/dto/req.dto';

@ApiTags('develop')
@Controller('develop')
export class DevelopController {
  constructor(private readonly developService: DevelopService) {}

  @Get('user/all')
  getAllUser() {
    return this.developService.getAllUser();
  }

  @Delete('delete/user/:userId')
  deleteUserById(@Param('userId') userId: string) {
    return this.developService.deleteUserById(userId);
  }

  @Delete('delete/challenge/:challengeId')
  deleteChallengeById(@Param('challengeId') challengeId: string) {
    return this.developService.deleteChallengeById(challengeId);
  }

  @Delete('delete/myChallenge/:userChallengeId')
  deleteUserChallengeById(@Param('userChallengeId') userChallengeId: string) {
    return this.developService.deleteUserChallengeById(userChallengeId);
  }

  @Post('push/token')
  pushToken(@Body() { deviceToken }: DeviceTokenReqDto) {
    return this.developService.savePushToken(deviceToken);
  }

  @Post('push/message')
  pushMessage(@Body() data: PushMessageReqDto) {
    return this.developService.sendPushMessage(data);
  }

  @Post('crypto/verifyChallenge')
  verifyCryptoChallenge(@Body() data: VerifyCryptoReqDto) {
    return this.developService.verifyCryptoChallenge(data);
  }

  @Post('crypto/selectWinner')
  setWinner(@Body() data: SetResultReqDto) {
    return this.developService.setWinner(data);
  }
}
