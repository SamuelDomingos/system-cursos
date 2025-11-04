import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/progress.dto';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentGuard } from 'src/auth/guards/enrollment.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), EnrollmentGuard)
  updateProgress(@Body() dto: UpdateProgressDto) {
    return this.progressService.updateProgress(dto);
  }

  @Get('user/:userId/course/:courseId')
  @UseGuards(AuthGuard('jwt'), EnrollmentGuard)
  getProgress(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.progressService.getUserProgressInCourse(userId, courseId);
  }
}
