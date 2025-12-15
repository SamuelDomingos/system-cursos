import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManyLessonsDto, UpdateLessonDto } from './dto/lessons.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateManyLessonsDto) {
    const createdLessons: any[] = [];

    for (const lessonData of data.lessons) {
      const module = await this.prisma.module.findUnique({
        where: { id: lessonData.moduleId },
      });

      if (!module) {
        throw new NotFoundException(
          `Módulo com ID ${lessonData.moduleId} não encontrado`,
        );
      }

      const createdLesson = await this.prisma.lesson.create({
        data: {
          title: lessonData.title,
          videoUrl: lessonData.videoUrl,
          moduleId: lessonData.moduleId,
          content: lessonData.content,
        },
        include: {
          module: {
            select: {
              title: true,
              course: { select: { id: true, title: true } },
            },
          },
        },
      });
      createdLessons.push(createdLesson);
    }
    return createdLessons;
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) throw new NotFoundException('Lição não encontrada');

    const module = await this.prisma.module.findUnique({
      where: { id: lesson.moduleId },
      select: { courseId: true },
    });

    if (!module) throw new NotFoundException('Módulo associado à lição não encontrado');

    const courseStructure = await this.prisma.course.findUnique({
      where: { id: module.courseId },
      select: {
        title: true,
        description: true,
        modules: {
          select: {
            id: true,
            title: true,
            lessons: {
              select: {
                id: true,
                title: true,
                content: true
              },
            },
          },
        },
      },
    });

    if (!courseStructure) {
      throw new NotFoundException('Curso associado à lição não encontrado');
    }

    return {
      lesson,
      courseStructure,
    };
  }

  async update(id: string, data: UpdateLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id: String(id) } });
    if (!lesson) throw new NotFoundException('Lição não encontrada');

    return this.prisma.lesson.update({
      where: { id },
      data,
      include: {
        module: {
          select: {
            title: true,
            course: { select: { id: true, title: true } },
          },
        },
      },
    });
  }

  async remove(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lição não encontrada');

    await this.prisma.lesson.delete({ where: { id } });
    return { message: 'Lição deletada com sucesso' };
  }
  
  async _findLastUserLessonId(userId: string, courseId: string): Promise<string | null> {
    const lastProgress = await this.prisma.progress.findFirst({
      where: {
        userId,
        lesson: {
          module: {
            courseId: courseId,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        lessonId: true,
      },
    });

    if (lastProgress?.lessonId) return lastProgress.lessonId;

    const firstModule = await this.prisma.module.findFirst({
      where: { courseId: courseId },
      orderBy: { id: 'asc' },
      select: { id: true },
    });

    if (!firstModule) return null;

    const firstLesson = await this.prisma.lesson.findFirst({
      where: { moduleId: firstModule.id },
      orderBy: { id: 'asc' },
      select: { id: true },
    });

    return firstLesson?.id || null;
  }
}
