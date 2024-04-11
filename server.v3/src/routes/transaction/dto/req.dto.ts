import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DepositCryptoReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'zYR59uRimLWz9Bm3xRtQAauJzLu1',
    required: true,
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '65e8088b899bc9e2a27d578f',
    required: true,
  })
  challengeId: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 30,
    required: true,
  })
  deposit: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0x7c8A343bd9C8cb512F69AFDce2872b67858ebF35',
    required: true,
  })
  walletAddress: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: true,
    required: true,
  })
  isNotify: boolean;
}

export class VerifyCryptoReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '65e8088b899bc9e2a27d578f',
    required: true,
  })
  challengeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2024-03-07',
    required: true,
  })
  date: string;
}

export class SetResultReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '65e8088b899bc9e2a27d578f',
    required: true,
  })
  challengeId: string;
}

export class ViewResultsReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '65e80f45842000a263c29671',
    required: true,
  })
  userChallengeId: string;
}
