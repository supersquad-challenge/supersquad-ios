import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '659f4734276a93eb2bc10ea8' })
  userChallengeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Verification Date',
    example: '2024-02-23',
  })
  date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'pass, fail',
    example: 'fail',
  })
  verifyStatus: string;
}

export class PostReqDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
  })
  file: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '659f4734276a93eb2bc10ea8' })
  userChallengeId: string;
}
