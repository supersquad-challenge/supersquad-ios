import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NicknameReqDto, SignupReqDto } from './dto/req.dto';
import { UserIdReqDto } from 'src/common/req.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  signup(@UploadedFile() file: any, @Body() data: SignupReqDto) {
    return this.userService.signup(file, data);
  }

  @Post('nickname')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  registerUserName(@UploadedFile() file: any, @Body() data: NicknameReqDto) {
    return this.userService.registerUserName(file, data);
  }

  @Get('detail/:userId')
  getUserInfo(@Param() { userId }: UserIdReqDto) {
    return this.userService.getUserInfo(userId);
  }

  @Post('removeUser')
  removeUser(@Body() { userId }: UserIdReqDto) {
    return this.userService.removeUser(userId);
  }
}
