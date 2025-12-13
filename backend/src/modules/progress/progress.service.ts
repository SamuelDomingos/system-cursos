import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgressDto } from './dto/progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async _updateProgress(dto: UpdateProgressDto) {
    const { userId, lessonId, watchTime, duration, completed } = dto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lição não encontrada');

    const isCompleted =
      completed ?? (duration && watchTime ? watchTime / duration >= 0.9 : false);

    return this.prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { watchTime, duration, completed: isCompleted },
      create: { userId, lessonId, watchTime, duration, completed: isCompleted },
    });
  }
}
