import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Headers,
  BadRequestException,
  HttpCode,
  HttpStatus,
  RawBody,
} from '@nestjs/common';

import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CoursesService } from '../courses/courses.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly coursesService: CoursesService,
    private readonly enrollmentsService: EnrollmentsService,
  ) { }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() createCheckoutDto: CreateCheckoutDto) {

    const courses = await this.coursesService._findManyByIds(
      createCheckoutDto.courseIds,
    );

    return this.stripeService.createCheckoutSession(courses, createCheckoutDto);
  }

  @Get('session-status')
  async getSessionStatus(@Query('session_id') sessionId: string) {
    return this.stripeService.getSessionStatus(sessionId);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @RawBody() body: Buffer,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException('Stripe signature ausente');
    }

    const event = this.stripeService.constructWebhookEvent(body, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await this.handleCheckoutSessionCompleted(session);
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }

  private async handleCheckoutSessionCompleted(
    session: any,
  ): Promise<void> {
    try {
      const fullSession = await this.stripeService.getFullSessionDetails(
        session.id,
      );

      const courseIds = JSON.parse(
        fullSession.metadata?.courseIds || '[]',
      ) as string[];
      const userId = fullSession.metadata?.userId;

      if (!userId || courseIds.length === 0) {
        console.error('Metadata inválida na sessão:', fullSession.metadata);
        return;
      }

      for (const courseId of courseIds) {
        await this.enrollmentsService.create({
          userId,
          courseId,
        });
      }

      console.log(`Enrollments criados para usuário ${userId}`);
    } catch (error) {
      console.error('Erro ao processar checkout completo:', error);
      throw error;
    }
  }

}