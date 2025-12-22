import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [PrismaModule, LessonsModule],
  providers: [ProgressService],
  exports: [ProgressModule]
})
export class ProgressModule {}
