import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProgressService } from '../progress/progress.service';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [PrismaModule, LessonsModule],
  controllers: [ListController],
  providers: [ListService, ProgressService],
})

export class ListModule { }