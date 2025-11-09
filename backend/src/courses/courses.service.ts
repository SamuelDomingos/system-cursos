import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCourseDto) {
    const instructor = await this.prisma.user.findUnique({
      where: { id: data.instructorId },
    });

    if (!instructor) {
      throw new NotFoundException('Instrutor não encontrado');
    }

    return this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        instructorId: data.instructorId,
      },
      include: { instructor: true },
    });
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
        instructor: { select: { id: true, name: true, email: true, role: true } },
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

    return this.prisma.course.update({
      where: { id },
      data,
      include: {
        instructor: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso não encontrado');

    await this.prisma.course.delete({ where: { id } });
    return { message: 'Curso deletado com sucesso' };
  }
}
