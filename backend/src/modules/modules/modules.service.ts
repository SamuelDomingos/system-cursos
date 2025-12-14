import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManyModulesDto, UpdateModuleDto } from './dto/modules.dto';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateManyModulesDto) {
    const createdModules: any[] = [];

    for (const moduleData of data.modules) {
      const course = await this.prisma.course.findUnique({
        where: { id: moduleData.courseId },
      });

      if (!course) {
        throw new NotFoundException(
          `Curso com ID ${moduleData.courseId} não encontrado`,
        );
      }

      const createdModule = await this.prisma.module.create({
        data: {
          title: moduleData.title,
          courseId: moduleData.courseId,
        },
        include: { course: { select: {  title: true } } },
      });
      createdModules.push(createdModule);
    }
    return createdModules;
  }

  async findAll() {
    return this.prisma.module.findMany({
      include: {
        course: { select: { title: true } },
        lessons: true,
      },
    });
  }

  async findOne(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: {
        course: { select: { title: true } },
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
      data: {
        title: data.title,
        ...(data.courseId !== undefined && { courseId: data.courseId }),
      },
      include: { course: { select: { title: true } } },
    });
  }

  async remove(id: string) {
    const module = await this.prisma.module.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Módulo não encontrado');

    await this.prisma.module.delete({ where: { id } });
    return { message: 'Módulo deletado com sucesso' };
  }
}