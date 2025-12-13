import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY não configurada');
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createCheckoutSession(
    courses: any[],
    dto: CreateCheckoutDto,
  ): Promise<{ checkoutUrl: string }> {
    if (!Array.isArray(courses) || courses.length === 0) {
      throw new NotFoundException('Nenhum curso encontrado');
    }

    // Validação de cursos publicados
    // const invalidCourses = courses.filter((c) => c.status !== 'PUBLISHED');
    // if (invalidCourses.length > 0) {
    //   throw new BadRequestException(
    //     `Curso(s) ${invalidCourses.map((c) => c.title).join(', ')} não disponível(is)`,
    //   );
    // }

    const invalidPrices = courses.filter((c) => !c.price || c.price <= 0);
    if (invalidPrices.length > 0) {
      throw new BadRequestException('Um ou mais cursos possui preço inválido');
    }

    const lineItems = courses.map((course) => ({
      price_data: {
        product_data: {
          name: course.title,
          description: `Acesso completo ao curso: ${course.title}`,
          metadata: { courseId: course.id },
          images: course.thumbnail ? [`${this.configService.get('BACKEND_URL')}${course.thumbnail}`] : undefined,
        },
        currency: 'brl',
        unit_amount: Math.round(course.price * 100),
      },
      quantity: 1,
    }));

    try {

      if (!dto.userId) {
        throw new BadRequestException('ID do usuário é obrigatório para criar a sessão de checkout');
      }

      const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        billing_address_collection: 'auto',
        line_items: lineItems,
        mode: 'payment',
        customer_email: user.email,
        client_reference_id: dto.userId,
        success_url: `${this.configService.get('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/cart`,
        metadata: {
          userId: user.id,
          courseIds: JSON.stringify(courses.map(c => c.id)),
        },
      };
      const session = await this.stripe.checkout.sessions.create(sessionParams);

      return {
        checkoutUrl: session.url!,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar sessão: ${error.message}`, error.stack);
      throw new BadRequestException('Erro ao processar pagamento');
    }
  }

  async getSessionStatus(
    sessionId: string,
  ): Promise<{
    status: string;
    payment_status: string;
    customer_email: string | null;
    amount_total: number;
    currency: string | null;
  }> {
    if (!sessionId?.trim()) {
      throw new BadRequestException('Session ID é obrigatório');
    }

    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items'],
      });

      return {
        status: session.status ?? 'unknown',
        payment_status: session.payment_status,
        customer_email: session.customer_email || null,
        amount_total: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || null,
      };
    } catch (error) {
      if (error.type === 'StripeInvalidRequestError') {
        throw new NotFoundException('Sessão não encontrada');
      }
      this.logger.error(`Erro ao buscar sessão: ${error.message}`, error.stack);
      throw new BadRequestException('Erro ao recuperar status');
    }
  }

  constructWebhookEvent(body: Buffer, signature: string): Stripe.Event {
    try {
      return this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!,
      );
    } catch (error) {
      throw new BadRequestException(`Webhook Error: ${error.message}`);
    }
  }

  async getFullSessionDetails(
    sessionId: string,
  ): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.charges.data', 'line_items'],
    });
  }
}