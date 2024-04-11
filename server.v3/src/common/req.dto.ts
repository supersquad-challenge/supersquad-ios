import { ApiProperty } from '@nestjs/swagger';

export class ChallengeIdReqDto {
  @ApiProperty({ example: '659ce1248d73c119ff33cf44' /* required: true */ })
  challengeId: string;
}

export class UserChallengeIdReqDto {
  @ApiProperty({ example: '65a21e786cd871fa926d52dd' /* required: true */ })
  userChallengeId: string;
}

export class UserIdReqDto {
  @ApiProperty({ example: 'NIUydGd73AbCTD4ZD7yqK5NC1ya2' /* required: true */ })
  userId: string;
}

export class StatusReqDto {
  @ApiProperty({
    description: 'challenge status: not started, ongoing, completed',
    required: false,
  })
  status?: string;
}
