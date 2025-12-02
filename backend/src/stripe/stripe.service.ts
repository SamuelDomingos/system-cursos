import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private enrollmentsService: EnrollmentsService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2025-08-27.basil',
      },
    );
  }

  async createCheckoutSession(courses: any[], dto: CreateCheckoutDto) {
    if (!Array.isArray(courses) || courses.length === 0) {
      throw new NotFoundException('Cursos não encontrados');
    }

    // const invalid = courses.filter(c => c.status !== 'PUBLISHED');
    // if (invalid.length) {
    //   throw new BadRequestException('Curso(s) não disponível(is) para compra');
    // }

    const lineItems = courses.map(course => ({
      price_data: {
        product_data: {
          name: course.title,
          description: `Acesso completo ao curso: ${course.title}`,
          metadata: { courseId: course.id },
        },
        currency: 'brl',
        unit_amount: Math.round(course.price * 100),
      },
      quantity: 1,
    }));

    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'custom',
      customer_email: dto.customerEmail,
      line_items: lineItems,
      mode: 'payment',
      return_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        courseIds: JSON.stringify(courses.map(c => c.id)),
        userId: dto.userId ?? '',
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      automatic_tax: { enabled: false },
    });

    return {
      clientSecret: session.client_secret,
      sessionId: session.id,
    };
  }

  async getSessionStatus(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items'],
    });

    if (!sessionId) {
      throw new BadRequestException('Session ID é obrigatório');
    }

    return {
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      metadata: session.metadata,
    };
  }

  constructEventFromPayload(signature: string, payload: Buffer): Stripe.Event {
    const secret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    let event: Stripe.Event;

    try {
      event = this.constructEventFromPayload(signature, rawBody);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutComplete(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        console.log('Pagamento concluído:', event.data.object.id);
        break;

      case 'payment_intent.payment_failed':
        console.log('Pagamento falhou:', event.data.object.id);
        break;

      case 'charge.refunded':
        console.log('Reembolso realizado:', event.data.object.id);
        break;

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }

  private async handleCheckoutComplete(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const courseIdsString = session.metadata?.courseIds;

    if (!userId || !courseIdsString) {
      console.error('Metadata incompleta: userId ou courseIds ausentes', session.metadata);
      return;
    }

    let courseIds: string[];
    try {
      courseIds = JSON.parse(courseIdsString);
      if (!Array.isArray(courseIds)) {
        throw new Error('courseIds não é um array válido');
      }
    } catch (error) {
      console.error('Erro ao parsear courseIds do metadata:', error.message);
      return;
    }

    for (const courseId of courseIds) {
      try {
        const enrollment = await this.enrollmentsService.enrollUser({
          userId,
          courseId,
        });
        console.log(`Matrícula criada para o curso ${courseId}:`, enrollment.id);
      } catch (error) {
        if (error.status === 409) {
          console.log(`Usuário já matriculado no curso ${courseId}, ignorando.`);
          continue;
        }
        console.error(`Erro ao matricular no curso ${courseId}:`, error.message);
      }
    }
  }

  async createRefund(paymentIntentId: string): Promise<Stripe.Refund> {
    return await this.stripe.refunds.create({
      payment_intent: paymentIntentId,
    });
  }
}
