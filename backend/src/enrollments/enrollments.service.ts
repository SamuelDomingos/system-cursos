import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enrollUser(dto: CreateEnrollmentDto) {
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

  async findUserEnrollments(userId: string) { 
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: { modules: { include: { lessons: true } } },
        },
      },
    });
  }
  
  async findCourseEnrollments(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }
}
