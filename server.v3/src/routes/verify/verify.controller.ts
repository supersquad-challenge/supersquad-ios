import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VerifyService } from './verify.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserChallengeIdReqDto } from 'src/common/req.dto';
import { VerifyReqDto } from './dto/req.dto';
import { PostReqDto } from './dto/req.dto';

@ApiTags('verify')
@Controller('verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post('postPhoto')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  postPhoto(@UploadedFile() file: any, @Body() data: PostReqDto) {
    if (!file) {
      throw new BadRequestException('file should not be empty');
    }
    return this.verifyService.postPhoto(data, file);
  }

  @Post('verifyChallenge')
  verifyChallenge(@Body() data: VerifyReqDto) {
    return this.verifyService.verifyChallenge(data);
  }

  @Get('allPhotoInfo/:userChallengeId')
  getAllPhotos(@Param() { userChallengeId }: UserChallengeIdReqDto) {
    return this.verifyService.getAllPhotos(userChallengeId);
  }
}
