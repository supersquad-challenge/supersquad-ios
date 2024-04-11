import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceTokenReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'ExponentPushToken[fxFb0aLeosaU_8tsjZwigT]',
    required: true,
  })
  deviceToken: string;
}

export class featuredChallengeId {
  @ApiProperty({
    example: '659ce4a28d73c119ff33cf6f',
  })
  challengeId: string;
}

export class PushMessageReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '659ce4a28d73c119ff33cf6f',
    required: true,
  })
  deviceToken: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'test',
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Hello, World!',
    required: true,
  })
  message: string;
}
