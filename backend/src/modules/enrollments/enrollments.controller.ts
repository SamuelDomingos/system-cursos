import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserOwnershipGuard } from 'src/guards/UserOwnership.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'), UserOwnershipGuard)
  findUserEnrollments(@Param('id') userId: string, @Query() query: PaginationDto) {
    return this.enrollmentsService.findUserEnrollments(userId, query);
  }
}
