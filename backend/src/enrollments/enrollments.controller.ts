import { Controller, Post, Get, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/enrollment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  enroll(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.enrollUser(dto);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  findUserEnrollments(@Param('userId', ParseIntPipe) userId: number) {
    return this.enrollmentsService.findUserEnrollments(userId);
  }

  @Get('course/:courseId')
  @UseGuards(AuthGuard('jwt'))
  findCourseEnrollments(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.enrollmentsService.findCourseEnrollments(courseId);
  }
}
