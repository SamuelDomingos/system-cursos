import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Headers,
  RawBodyRequest,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { items: Array<{ name: string; price: number; quantity: number }>, email?: string },
  ) {
    const lineItems = await Promise.all(
      body.items.map(async (item) => {
        const priceData = await this.stripeService.createPrice(
          item.name,
          item.price * 100,
        );
        return {
          ...priceData,
          quantity: item.quantity,
        };
      }),
    );

    const session = await this.stripeService.createCheckoutSession(
      lineItems,
      body.email,
    );

    return {
      clientSecret: session.client_secret,
    };
  }

  @Get('session-status')
  async getSessionStatus(@Query('session_id') sessionId: string) {
    const session = await this.stripeService.retrieveSession(sessionId);

    return {
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
    };
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    const event = this.stripeService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Pagamento concluído:', session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent bem-sucedido:', paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Pagamento falhou:', failedPayment);
        break;

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }
}