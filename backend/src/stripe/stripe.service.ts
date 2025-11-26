import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2025-08-27.basil',
      },
    );
  }

  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    customerEmail?: string,
  ): Promise<Stripe.Checkout.Session> {
    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'custom',
      customer_email: customerEmail,
      line_items: lineItems,
      mode: 'payment',
      return_url: `${this.configService.get('FRONTEND_URL')}/complete?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session;
  }

  async retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });
  }

  async createPrice(
    productName: string,
    amount: number,
    currency: string = 'brl',
  ): Promise<Stripe.Checkout.SessionCreateParams.LineItem> {
    return {
      price_data: {
        product_data: {
          name: productName,
        },
        currency,
        unit_amount: amount,
      },
      quantity: 1,
    };
  }

  async createSubscriptionSession(
    priceId: string,
    customerEmail?: string,
  ): Promise<Stripe.Checkout.Session> {
    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'custom',
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      return_url: `${this.configService.get('FRONTEND_URL')}/complete?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session;
  }

  constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }
}