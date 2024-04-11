import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  AllChallengeReqDto,
  CheckMyChallengeReqDto,
  CreateChallengeReqDto,
} from './dto/req.dto';
import { UserChallengeIdReqDto } from 'src/common/req.dto';

@ApiTags('challenge')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  getChallengeAll(@Query() query: AllChallengeReqDto) {
    return this.challengeService.getChallengeAll(query);
  }

  @Get('category')
  getChallengeCategory() {
    return this.challengeService.getChallengeCategory();
  }

  @Get('user/:userChallengeId')
  getChallengeByUserChallengeId(
    @Param() { userChallengeId }: UserChallengeIdReqDto,
  ) {
    return this.challengeService.getChallengeByUserChallengeId(userChallengeId);
  }

  @Get(':challengeId/:userId?')
  getChallengeById(@Param() { challengeId, userId }: CheckMyChallengeReqDto) {
    return this.challengeService.getChallengeById(challengeId, userId);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  createChallenge(
    @UploadedFile() file: any,
    @Body() data: CreateChallengeReqDto,
  ) {
    if (!file) {
      throw new BadRequestException('file should not be empty');
    }
    return this.challengeService.createChallenge(data, file);
  }
}
