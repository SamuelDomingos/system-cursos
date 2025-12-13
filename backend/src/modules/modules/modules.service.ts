import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuleDto, UpdateModuleDto } from './dto/modules.dto';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateModuleDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) throw new NotFoundException('Curso não encontrado');

    return this.prisma.module.create({
      data: {
        title: data.title,
        courseId: data.courseId,
      },
      include: { course: { select: { id: true, title: true } } },
    });
  }

  async findAll() {
    return this.prisma.module.findMany({
      include: {
        course: { select: { id: true, title: true } },
        lessons: true,
      },
    });
  }

  async findOne(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true } },
        lessons: true,
      },
    });

    if (!module) throw new NotFoundException('Módulo não encontrado');
    return module;
  }

  async update(id: string, data: UpdateModuleDto) {
    const module = await this.prisma.module.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Módulo não encontrado');

    return this.prisma.module.update({
      where: { id },
      data,
      include: { course: { select: { id: true, title: true } } },
    });
  }

  async remove(id: string) {
    const module = await this.prisma.module.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Módulo não encontrado');

    await this.prisma.module.delete({ where: { id } });
    return { message: 'Módulo deletado com sucesso' };
  }
}
