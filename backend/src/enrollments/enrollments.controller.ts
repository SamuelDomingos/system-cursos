import { Controller, Post, Get, Body, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/enrollment.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(dto);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  findUserEnrollments(@Param('userId') userId: string, @Query() query: PaginationDto) {
    return this.enrollmentsService.findUserEnrollments(userId, query);
  }

  @Get('course/:courseId')
  @UseGuards(AuthGuard('jwt'))
  findCourseEnrollments(@Param('courseId') courseId: string) {
    return this.enrollmentsService.findCourseEnrollments(courseId);
  }
}
