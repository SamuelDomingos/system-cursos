import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { id } = request.params;

    if (!user) {
      throw new ForbiddenException('Você precisa estar autenticado');
    }

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: Number(id) },
      include: {
        module: { include: { course: true } },
      },
    });

    if (!lesson) throw new NotFoundException('Lição não encontrada');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.module.course.id,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'Você precisa estar matriculado neste curso para acessar esta lição',
      );
    }

    return true;
  }
}
