import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AllChallengeReqDto {
  @ApiProperty({
    description:
      'Search Index: Corresponding to challenge name and category: mind, diet, etc',
    required: false,
  })
  q?: string;

  @ApiProperty({
    description:
      'Case Sensitivity: Diet, Fitness, Mental Health, Habit, Featured',
    required: false,
  })
  category?: string;
}

export class CheckMyChallengeReqDto {
  @ApiProperty({ example: '659ce1248d73c119ff33cf44' })
  challengeId: string;

  @ApiProperty({ example: 'zdkZeUOTZncwk496CU4TJCmVtRS2', required: false })
  userId?: string;
}

export class CreateChallengeReqDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
  })
  file: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Diet' })
  category: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Creation fails if name is duplicated',
    example: 'Lose 500lbs',
  })
  name: string;

  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: 'challenge start date',
    example: '2024-03-18T00:00:00Z',
    required: false,
  })
  startAt?: Date;

  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: 'challenge end date',
    example: '2024-03-22T00:00:00Z',
    required: false,
  })
  endAt?: Date;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Verification frequency: 7-매일, 5-주5회, 3-주3회, 1-주1회',
    example: 7,
    type: 'integer',
  })
  frequency: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'entire period',
    example: 14,
    type: 'integer',
  })
  period: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    example: 14,
    type: 'integer',
  })
  totalVerifyNum: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Number of participants: 0', // number 0 은 swagger UI에서 처리못함
    type: 'integer',
  })
  participants: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'verifyMethod: photo-갤러리, camera-카메라',
    example: 'photo',
  })
  verifyMethod: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'depositMethod: cash, crypto',
    example: 'crypto',
  })
  depositMethod: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'cashSuccessPool: 0',
    type: 'integer',
  })
  cashSuccessPool: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'cashFailPool: 0',
    type: 'integer',
  })
  cashFailPool: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'cryptoSuccessPool: 0',
    type: 'integer',
  })
  cryptoSuccessPool: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'cryptoFailPool: 0',
    type: 'integer',
  })
  cryptoFailPool: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'Photos should display your weight and both of your feet on the scale.',
  })
  howTo: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'pledge: 0', type: 'integer' })
  pledge: number;
}
