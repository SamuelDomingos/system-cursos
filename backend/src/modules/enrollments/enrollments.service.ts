import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/enrollment.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  async _create(dto: CreateEnrollmentDto) {
    const { userId, courseId } = dto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Curso não encontrado');

    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) throw new ConflictException('Usuário já está matriculado neste curso');

    return this.prisma.enrollment.create({
      data: { userId, courseId },
      include: {
        course: { select: { id: true, title: true } },
        user: { select: { id: true, name: true } },
      },
    });
  }

  async findUserEnrollments(userId: string, query: PaginationDto) {
    const { page = 1, limit = 10 } = query;
    const where: any = { userId };
    const total = await this.prisma.enrollment.count({ where });

    const enrollments = await this.prisma.enrollment.findMany({
      where,
      include: {
        course: {
          include: { instructor: { select: { id: true, name: true, avatar: true } } },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!enrollments.length) throw new NotFoundException('Nenhum curso matriculado para este usuário');

    const withProgress = await Promise.all(
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

        return {
          course: course,
          userProgress: {
            totalLessons,
            completedLessons,
            progressPercentage,
            totalWatchTime: totalWatchTime._sum.watchTime || 0,
          },
        };
      })
    );

    return {
      data: withProgress,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

}
