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

      return_url: `${this.configService.get('FRONTEND_URL')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      payment_method_types: ['card', 'boleto', 'pix'],

      // Adicione configuração para Pix
      payment_method_options: {
        boleto: {
          expires_after_days: 3,
        },
        pix: {
          expires_after_seconds: 3600,
        }
      },

      metadata: {
        courseIds: JSON.stringify(courses.map(c => c.id)),
        userId: dto.userId ?? '',
        internalStatus: 'pending',
      },

      billing_address_collection: 'required',
      automatic_tax: { enabled: false },

      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    });

    return {
      clientSecret: session.client_secret,
      sessionId: session.id,
      status: 'pending',
    };
  }

  async getSessionStatus(sessionId: string) {
    if (!sessionId) {
      throw new BadRequestException('Session ID é obrigatório');
    }

    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items'],
    });

    return {
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      client_secret: session.client_secret || '',
      metadata: session.metadata,
    };
  }

  constructEventFromPayload(signature: string, payload: Buffer): Stripe.Event {
    const secret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    if (!secret) {
      throw new Error('STRIPE_WEBHOOK_SECRET não configurado');
    }

    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    let event: Stripe.Event;

    try {
      event = this.constructEventFromPayload(signature, rawBody);
    } catch (err) {
      console.error('Erro ao validar webhook:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    console.log(`Recebido evento: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status === 'paid') {
          console.log(`Checkout completo com pagamento confirmado: ${session.id}`);
          await this.processEnrollments(session);
        } else {
          console.log(`Checkout completo mas pagamento pendente (Pix/Boleto): ${session.id}`);
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Pagamento assíncrono confirmado: ${session.id}`);
        await this.processEnrollments(session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Pagamento assíncrono falhou: ${session.id}`);
        await this.handlePaymentFailure(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent sucedido: ${paymentIntent.id}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent falhou: ${paymentIntent.id}`);
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }

  private async processEnrollments(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const courseIdsString = session.metadata?.courseIds;

    if (!userId || !courseIdsString) {
      console.error('Metadata incompleta:', session.metadata);
      return;
    }

    let courseIds: string[];
    try {
      courseIds = JSON.parse(courseIdsString);
      if (!Array.isArray(courseIds)) {
        throw new Error('courseIds não é um array válido');
      }
    } catch (error) {
      console.error('Erro ao parsear courseIds:', error.message);
      return;
    }

    await this.stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        internalStatus: 'completed',
        processedAt: new Date().toISOString(),
      },
    });

    for (const courseId of courseIds) {
      try {
        const enrollment = await this.enrollmentsService.enrollUser({
          userId,
          courseId,
        });
        console.log(`✅ Matrícula criada: curso ${courseId}, enrollment ${enrollment.id}`);
      } catch (error) {
        if (error.status === 409) {
          console.log(`ℹ️ Usuário já matriculado no curso ${courseId}`);
          continue;
        }
        console.error(`❌ Erro ao matricular no curso ${courseId}:`, error.message);
      }
    }
  }

  private async handlePaymentFailure(session: Stripe.Checkout.Session) {
    await this.stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        internalStatus: 'failed',
        failedAt: new Date().toISOString(),
      },
    });

    // Aqui você pode:
    // - Enviar email notificando o usuário
    // - Registrar em logs/analytics
    // - Criar registro de tentativa falhada
    console.log(`Pagamento falhou para sessão: ${session.id}`);
  }

  /**
   * Cancela um checkout expirado ou abandonado
   */
  async expireSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return await this.stripe.checkout.sessions.expire(sessionId);
  }
}