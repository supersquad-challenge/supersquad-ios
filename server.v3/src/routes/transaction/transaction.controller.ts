import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { ethers } from 'ethers';
import {
  DepositCryptoReqDto,
  SetResultReqDto,
  VerifyCryptoReqDto,
  ViewResultsReqDto,
} from './dto/req.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getHello(): Promise<ethers.BigNumberish> {
    return this.transactionService.getHello();
  }

  @Post('deposit')
  depositCrypto(@Body() data: DepositCryptoReqDto) {
    return this.transactionService.depositCrypto(data);
  }

  @Get('viewResults/:userChallengeId')
  viewResults(@Param() { userChallengeId }: ViewResultsReqDto) {
    return this.transactionService.viewResults(userChallengeId);
  }

  @Post('claim')
  claimCrypto(@Body() { userChallengeId }: ViewResultsReqDto) {
    return this.transactionService.claimCrypto(userChallengeId);
  }
}
