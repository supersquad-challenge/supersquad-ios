import { ApiTags } from '@nestjs/swagger';
import { UserChallengeService } from './user-challenge.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMyChallengeReqDto } from './dto/req.dto';
import {
  ChallengeIdReqDto,
  StatusReqDto,
  UserChallengeIdReqDto,
  UserIdReqDto,
} from 'src/common/req.dto';

@ApiTags('myChallenge')
@Controller('myChallenge')
export class UserChallengeController {
  constructor(private readonly myChallengeService: UserChallengeService) {}

  @Post('register')
  registerMyChallenge(@Body() data: CreateMyChallengeReqDto) {
    return this.myChallengeService.registerMyChallenge(data);
  }

  @Get('allMychallenge/:userId')
  getAllMychallenge(
    @Param() { userId }: UserIdReqDto,
    @Query() { status }: StatusReqDto,
  ) {
    return this.myChallengeService.getAllMychallenge(userId, status);
  }

  @Get('getChallenge/:challengeId/:userId')
  getChallenge(
    @Param() { challengeId }: ChallengeIdReqDto,
    @Param() { userId }: UserIdReqDto,
  ) {
    return this.myChallengeService.getChallenge(challengeId, userId);
  }

  @Get('myStatus/:userChallengeId')
  getMyStatus(@Param() { userChallengeId }: UserChallengeIdReqDto) {
    return this.myChallengeService.getMyStatus(userChallengeId);
  }

  @Get('payback/:userChallengeId')
  getPayback(@Param() { userChallengeId }: UserChallengeIdReqDto) {
    return this.myChallengeService.getPayback(userChallengeId);
  }

  @Get('verifyPhoto/:userChallengeId')
  getVerifyPhoto(@Param() { userChallengeId }: UserChallengeIdReqDto) {
    return this.myChallengeService.getVerifyPhoto(userChallengeId);
  }

  @Get('viewResults/:userChallengeId')
  setViewResults(@Param() { userChallengeId }: UserChallengeIdReqDto) {
    return this.myChallengeService.setViewResults(userChallengeId);
  }

  @Delete('delete/:userChallengeId')
  deleteMyChallenge(@Param() { userChallengeId }: UserChallengeIdReqDto) {
    return this.myChallengeService.deleteMyChallenge(userChallengeId);
  }
}
