import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeviceTokenReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example:
      'eJ_HiTWPSbaFWoswq3EZ38:APA91bEN3KkQNNgedYtHokoeR1PDyHbZPmHEngQxHnv46_hZL1MNt9wfOFcvJbKiyJtR274IqIEyl97D5Mr8IW_CqYTY9BxlHBt3paiscBkoEP8B4vOrSPfUL5pqwv4OSHhYdBZfIr7s',
  })
  deviceToken: string;
}

export class manualPushReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: '65b225a01144c7abc8e04c60',
  })
  userChallengeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example:
      'eJ_HiTWPSbaFWoswq3EZ38:APA91bEN3KkQNNgedYtHokoeR1PDyHbZPmHEngQxHnv46_hZL1MNt9wfOFcvJbKiyJtR274IqIEyl97D5Mr8IW_CqYTY9BxlHBt3paiscBkoEP8B4vOrSPfUL5pqwv4OSHhYdBZfIr7s',
  })
  deviceToken: string;
}

export class SetPushReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: '65b225a01144c7abc8e04c60',
  })
  userChallengeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example:
      'eJ_HiTWPSbaFWoswq3EZ38:APA91bEN3KkQNNgedYtHokoeR1PDyHbZPmHEngQxHnv46_hZL1MNt9wfOFcvJbKiyJtR274IqIEyl97D5Mr8IW_CqYTY9BxlHBt3paiscBkoEP8B4vOrSPfUL5pqwv4OSHhYdBZfIr7s',
  })
  deviceToken: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: '2024-02-05T07:47:03.344Z',
  })
  time: string;

  @ApiProperty({
    required: false,
    example: '["MON", "TUE", "WED", "THU", "FRI"]',
  })
  week?: string[];
}
