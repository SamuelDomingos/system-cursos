import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }

  private toSlug(s: string) {
    return s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async _associateCourseWithTopics(courseId: string, tagsJson: string) {
    try {
      const tags = tagsJson ? JSON.parse(tagsJson) : [];
      if (Array.isArray(tags) && tags.length) {
        for (const tag of tags) {
          const slug = this.toSlug(String(tag));
          let topic = await this.prisma.topic.findUnique({ where: { slug } });
          if (!topic) {
            continue;
          }
          await this.prisma.courseTopic.upsert({
            where: { courseId_topicId: { courseId: courseId, topicId: topic.id } },
            update: { relevance: 3 },
            create: { courseId: courseId, topicId: topic.id, relevance: 3 },
          });
        }
      }
    } catch (e) {
      console.error("Error associating course with topics:", e);
    }
  }

  async create(data: CreateCourseDto) {
    const instructor = await this.prisma.user.findUnique({
      where: { id: data.instructorId },
    });

    if (!instructor) {
      throw new NotFoundException('Instrutor não encontrado');
    }

    if (data.tags) {
      let parsedTags: string[];
      try {
        parsedTags = JSON.parse(data.tags);
      } catch (e) {
        throw new BadRequestException('Tags devem ser uma string JSON válida.');
      }

      if (!Array.isArray(parsedTags) || parsedTags.length < 3) {
        throw new BadRequestException('O curso deve ter no mínimo 3 tags.');
      }
    }

    const created = await this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        price: data.price,
        duration: data.duration,
        tags: data.tags,
        instructorId: data.instructorId,
      },
      include: {
        instructor: { select: { id: true, name: true, avatar: true } },
      },
    });

    await this._associateCourseWithTopics(created.id, created.tags);

    return created;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search } = paginationDto;

    const where = search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }
      : {};


    return this.prisma.course.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        instructor: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: { select: { id: true, name: true, avatar: true } },
        modules: {
          include: { lessons: true },
        },
      },
    });

    if (!course) throw new NotFoundException('Curso não encontrado');
    return course;
  }

  async update(id: string, data: UpdateCourseDto) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso não encontrado');

    if (data.tags !== undefined) {
      let parsedTags: string[];
      try {
        parsedTags = JSON.parse(data.tags);
      } catch (e) {
        throw new BadRequestException('Tags devem ser uma string JSON válida.');
      }

      if (!Array.isArray(parsedTags) || parsedTags.length < 3) {
        throw new BadRequestException('O curso deve ter no mínimo 3 tags.');
      }
    }

    const updated = await this.prisma.course.update({
      where: { id },
      data,
      include: {
        instructor: { select: { id: true, name: true } },
      },
    });

    await this._associateCourseWithTopics(updated.id, updated.tags);

    return updated;
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso não encontrado');

    await this.prisma.course.delete({ where: { id } });
    return { message: 'Curso deletado com sucesso' };
  }
}
