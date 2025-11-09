import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/lessons.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLessonDto) {
    const module = await this.prisma.module.findUnique({
      where: { id: data.moduleId },
    });

    if (!module) throw new NotFoundException('Módulo não encontrado');

    return this.prisma.lesson.create({
      data: {
        title: data.title,
        videoUrl: data.videoUrl,
        moduleId: data.moduleId,
        content: data.content,
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            course: { select: { id: true, title: true } },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      include: {
        module: {
          select: {
            id: true,
            title: true,
            course: { select: { id: true, title: true } },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            course: { select: { id: true, title: true } },
          },
        },
      },
    });

    if (!lesson) throw new NotFoundException('Lição não encontrada');
    return lesson;
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
            id: true,
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
}
