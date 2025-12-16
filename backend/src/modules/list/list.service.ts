import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { List, ListType } from '@prisma/client';
import { CreateListDto, UpdateListDto } from './dto/list.dto';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListDto, userId: string): Promise<List> {
    return this.prisma.list.create({
      data: {
        ...createListDto,
        userId,
        type: createListDto.type || ListType.CUSTOM,
      },
    });
  }

  async findAll(userId: string): Promise<List[]> {
    return this.prisma.list.findMany({
      where: { userId },
      include: { listCourses: { include: { course: true } } },
    });
  }

  async findOne(id: string, userId: string): Promise<List> {
    const list = await this.prisma.list.findUnique({
      where: { id, userId },
      include: { listCourses: { include: { course: true } } },
    });
    if (!list) {
      throw new NotFoundException(`List with ID "${id}" not found for this user.`);
    }
    return list;
  }

  async update(id: string, updateListDto: UpdateListDto, userId: string): Promise<List> {
    const existingList = await this.prisma.list.findUnique({ where: { id, userId } });
    if (!existingList) {
      throw new NotFoundException(`List with ID "${id}" not found for this user.`);
    }

    return this.prisma.list.update({
      where: { id },
      data: updateListDto,
    });
  }

  async remove(id: string, userId: string): Promise<List> {
    const existingList = await this.prisma.list.findUnique({ where: { id, userId } });
    if (!existingList) {
      throw new NotFoundException(`List with ID "${id}" not found for this user.`);
    }

    return this.prisma.list.delete({
      where: { id },
    });
  }
}