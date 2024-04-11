import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMyChallengeReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'NIUydGd73AbCTD4ZD7yqK5NC1ya2', required: true })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '659ce1248d73c119ff33cf44', required: true })
  challengeId: string;
}
