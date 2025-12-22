import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgressDto } from './dto/progress.dto';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService, private lessonsService: LessonsService) { }

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

  async _buildUserCourseProgress(userId: string, enrollments: any[]) {
    return Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course;

        const totalLessons = await this.prisma.lesson.count({
          where: { module: { courseId: course.id } },
        });

        const completedLessons = await this.prisma.progress.count({
          where: { userId, lesson: { module: { courseId: course.id } }, completed: true },
        });

        const totalWatchTime = await this.prisma.progress.aggregate({
          where: { userId, lesson: { module: { courseId: course.id } } },
          _sum: { watchTime: true },
        });

        const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        const lastLessonId = await this.lessonsService._findLastUserLessonId(userId, course.id);

        return {
          course: { lastLessonId, ...course },
          userProgress: {
            totalLessons,
            completedLessons,
            progressPercentage,
            totalWatchTime: totalWatchTime._sum.watchTime || 0,
          },
        };
      })
    );
  }
}
