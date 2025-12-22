import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProgressService } from '../progress/progress.service';
import { ProgressModule } from '../progress/progress.module';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [PrismaModule, ProgressModule, LessonsModule],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, ProgressService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
