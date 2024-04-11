import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class IntentReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'cus_PcY0c9C0Q8lPKK',
    required: true,
  })
  id: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: '100 = 1$ and minimum $0.5',
    example: 50,
    required: true,
  })
  amount: number;
}

export class CustomerIdReqDto {
  @ApiProperty({
    required: false,
  })
  id?: string;
}

export class DetachPaymentMethodReqDto {
  @ApiProperty({
    required: false,
  })
  paymentMethodId: string;
}

export class ConfirmPaymentReqDto {
  @ApiProperty({
    required: true,
  })
  paymentIntentId: string;

  @ApiProperty({
    required: true,
  })
  paymentMethod: string;
}

export class AttachPaymentMethodReqDto {
  @ApiProperty({
    required: true,
  })
  customer: string;

  @ApiProperty({
    required: true,
  })
  paymentMethod: string;
}

export class CreateCustomerReqDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'official@supersquad.xyz',
    required: true,
  })
  email: string;
}

export class IntentIdReqDto {
  @IsString()
  @ApiProperty({
    example: 'pi_3OjdHi2eZvKYlo2C0BOikfam',
    required: false,
  })
  intentId?: string;
}

export class RefundIdReqDto {
  @IsString()
  @ApiProperty({
    example: 're_3OjdHi2eZvKYlo2C0BOikfam',
    required: false,
  })
  refundId?: string;
}

export class DepositReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'NIUydGd73AbCTD4ZD7yqK5NC1ya2',
    required: true,
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '659ce1248d73c119ff33cf44',
    required: true,
  })
  challengeId: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 0,
    required: true,
  })
  deposit: number;

  @ApiProperty({
    example: 'pi_3OSDNJ2eZvKYlo2C0Y82Qo6v',
    required: false,
  })
  intentId?: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: '주 * 7일 ex) 2주 = 2 * 7 = 14',
    example: 14,
    required: true,
  })
  period: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description:
      'Verification frequency: 7-everyday, 5-Weekdays, 3-주3회, 2-weekend, 1-once',
    example: 7,
    required: true,
  })
  frequency: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Today',
    required: true,
  })
  startDay: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    required: true,
    example: '["MON", "TUE", "WED", "THU", "FRI"]',
  })
  week: string[];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: true,
    required: true,
  })
  isNotify: boolean;

  // @IsString()
  @ApiProperty({
    required: false,
    example:
      'eJ_HiTWPSbaFWoswq3EZ38:APA91bEN3KkQNNgedYtHokoeR1PDyHbZPmHEngQxHnv46_hZL1MNt9wfOFcvJbKiyJtR274IqIEyl97D5Mr8IW_CqYTY9BxlHBt3paiscBkoEP8B4vOrSPfUL5pqwv4OSHhYdBZfIr7s',
  })
  deviceToken?: string;

  // @IsString()
  @ApiProperty({
    required: false,
    example: '2024-02-05T07:47:03.344Z',
  })
  time?: string;
}

export class RefundReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'zYR59uRimLWz9Bm3xRtQAauJzLu1',
    required: true,
  })
  userId: string;
}
