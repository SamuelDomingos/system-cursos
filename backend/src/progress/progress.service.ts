import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgressDto } from './dto/progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async updateProgress(dto: UpdateProgressDto) {
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

  async getUserProgressInCourse(userId: string, courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: { module: { courseId } },
      select: { id: true },
    });

    const lessonIds = lessons.map(l => l.id);

    const progresses = await this.prisma.progress.findMany({
      where: { userId, lessonId: { in: lessonIds } },
      select: { completed: true, watchTime: true, duration: true },
    });

    const completedLessons = progresses.filter(p => p.completed).length;
    const totalLessons = lessonIds.length;

    return {
      totalLessons,
      completedLessons,
      progressPercentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
      totalWatchTime: progresses.reduce((acc, p) => acc + (p.watchTime || 0), 0),
    };
  }
}
