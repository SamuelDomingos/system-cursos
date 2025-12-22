import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { List, ListType } from '@prisma/client';
import { CreateListDto, UpdateListDto } from './dto/list.dto';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService, private ProgressService: ProgressService) { }

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
    const lists = await this.prisma.list.findMany({
      where: { userId },
      include: {
        listCourses: {
          include: {
            course: {
              include: {
                instructor: { select: { id: true, name: true, avatar: true } },
              },
            },
          },
        },
      },
    });

    const courseIds = lists.flatMap(list => list.listCourses.map(lc => lc.courseId));
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId, courseId: { in: courseIds } },
      include: { course: true },
    });

    const progress = await this.ProgressService._buildUserCourseProgress(userId, enrollments);
    return lists.map(list => ({
      ...list,
      listCourses: list.listCourses.map(lc => {
        const courseProgress = progress.find(p => p.course.id === lc.courseId);
        return {
          course: {
            ...lc.course,
          },
          userProgress: courseProgress
            ? {
              completedLessons: courseProgress.userProgress.completedLessons,
              totalLessons: courseProgress.userProgress.totalLessons,
              progressPercentage: courseProgress.userProgress.progressPercentage,
            }
            : { completedLessons: 0, totalLessons: 0, progressPercentage: 0 },
        };
      }),
    }));
  }

  async findListsAll(userId: string): Promise<List[]> {
    return this.prisma.list.findMany({
      where: { userId },
      include: {
        listCourses: {
          select: {
            course: { select: { id: true, title: true } }
          }
        }
      },
    });
  }

  async addCourseList(userId: string, id: string, courseId: string): Promise<List> {
    const list = await this.prisma.list.findFirst({ where: { id, userId } });
    if (!list) {
      throw new NotFoundException(`List with ID "${id}" not found for this user.`);
    }

    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException(`Course with ID "${courseId}" not found.`);
    }

    const existingEntry = await this.prisma.listCourse.findUnique({
      where: {
        listId_courseId: {
          listId: id,
          courseId: courseId,
        },
      },
    });

    if (existingEntry) {
      await this.prisma.listCourse.delete({
        where: {
          listId_courseId: {
            listId: id,
            courseId: courseId,
          },
        },
      });
    } else {
      await this.prisma.listCourse.create({
        data: {
          listId: id,
          courseId: courseId,
        },
      });
    }

    const updatedList = await this.prisma.list.findUnique({
      where: { id },
      include: { listCourses: { include: { course: { select: { id: true } } } } },
    });

    if (!updatedList) {
      throw new NotFoundException(`List with ID "${id}" not found after adding/removing course.`);
    }
    return updatedList;
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