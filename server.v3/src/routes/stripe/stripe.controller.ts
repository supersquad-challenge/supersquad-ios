import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiTags } from '@nestjs/swagger';
import {
  AttachPaymentMethodReqDto,
  ConfirmPaymentReqDto,
  CreateCustomerReqDto,
  CustomerIdReqDto,
  DepositReqDto,
  DetachPaymentMethodReqDto,
  IntentIdReqDto,
  IntentReqDto,
  RefundIdReqDto,
  RefundReqDto,
} from './dto/req.dto';
import { UserIdReqDto } from 'src/common/req.dto';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('stripe-key')
  getStripeKey() {
    return this.stripeService.getApiKey();
  }

  @Post('create-payment-intent')
  paymentIntent(@Body() { id, amount }: IntentReqDto) {
    return this.stripeService.paymentIntent(id, amount);
  }

  @Post('deposit')
  depositChallenge(@Body() data: DepositReqDto) {
    return this.stripeService.depositChallenge(data);
  }

  @Post('refund')
  refundPayment(@Body() { userId }: RefundReqDto) {
    return this.stripeService.refundPayment(userId);
  }

  @Get('allPayment/:userId')
  getAllPayment(@Param() { userId }: UserIdReqDto) {
    return this.stripeService.getAllPayment(userId);
  }

  @Get('intent/:intentId')
  getPaymentIntent(@Param() { intentId }: IntentIdReqDto) {
    return this.stripeService.getPaymentIntent(intentId);
  }

  @Get('refund/:refundId')
  getRefund(@Param() { refundId }: RefundIdReqDto) {
    return this.stripeService.getRefund(refundId);
  }

  @Post('fetch-customer')
  getCustomers(@Body() { id }: CustomerIdReqDto) {
    return this.stripeService.getCustomers(id);
  }

  @Post('create-customer')
  createCustomer(@Body() { email }: CreateCustomerReqDto) {
    return this.stripeService.createCustomer(email);
  }

  @Post('retrieve-payment-method')
  retrievePaymentMethods(@Body() { id }: CustomerIdReqDto) {
    return this.stripeService.retrievePaymentMethods(id);
  }

  @Post('attach-payment-method')
  attachPaymentMethod(@Body() data: AttachPaymentMethodReqDto) {
    return this.stripeService.attachPaymentMethod(data);
  }

  @Post('confirm-payment-intent')
  confirmPaymentIntent(@Body() data: ConfirmPaymentReqDto) {
    return this.stripeService.confirmPaymentIntent(data);
  }

  @Post('detach-payment-method')
  detachPaymentMethod(@Body() { paymentMethodId }: DetachPaymentMethodReqDto) {
    return this.stripeService.detachPaymentMethod(paymentMethodId);
  }
}
