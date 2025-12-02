import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Headers,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import type { RawBodyRequest } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CoursesService } from '../courses/courses.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly coursesService: CoursesService,
  ) { }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() createCheckoutDto: CreateCheckoutDto) {
    const courses = await this.coursesService._findManyByIds(createCheckoutDto.courseIds);

    return await this.stripeService.createCheckoutSession(courses, createCheckoutDto);
  }

  @Get('session-status')
  async getSessionStatus(@Query('session_id') sessionId: string) {

    return await this.stripeService.getSessionStatus(sessionId);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('Assinatura do webhook ausente');
    }

    if (!request.rawBody) {
      throw new BadRequestException('Raw body ausente no webhook');
    }

    return await this.stripeService.handleWebhook(signature, request.rawBody);
  }
}