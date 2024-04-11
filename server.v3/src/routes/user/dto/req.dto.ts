import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  file?: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'firebase userId' })
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'If there is a google profile', required: false })
  profileUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'If there is a nickname', required: false })
  nickname?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ex) Asia/Seoul' })
  timezone: string;

  // @IsNotEmpty()
  // @IsString()
  @ApiProperty({
    description: 'A deviceId for push notifications',
    required: false,
  })
  deviceId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'android, ios', example: 'ios', required: false })
  platform: string;
}

export class NicknameReqDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  file?: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'firebase userId',
    example: 'NIUydGd73AbCTD4ZD7yqK5NC1ya2',
    required: true,
  })
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  nickname?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  isNull?: boolean;
}
