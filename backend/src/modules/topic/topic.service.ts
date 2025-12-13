import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto, AddCourseToTopicDto } from './dto/topic.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateTopicDto) {
    return this.prisma.topic.create({ data: dto });
  }

  async findAll(
    topicPage = 1,
    topicLimit = 10,
    coursePage?: number,
    courseLimit?: number,
  ) {
    const topicTotal = await this.prisma.topic.count();

    const topics = await this.prisma.topic.findMany({
      include: {
        courses: {
          include: { course: true },
          orderBy: { relevance: 'desc' },
          ...(coursePage !== undefined && courseLimit !== undefined && {
            skip: (coursePage - 1) * courseLimit,
            take: courseLimit,
          }),
        },
      },
      skip: (topicPage - 1) * topicLimit,
      take: topicLimit,
    });

    const topicsWithCourseCount = await Promise.all(
    topics.map(async (topic) => {
      const courseTotal = await this.prisma.course.count({
        where: { id: topic.id },
      });
      return {
        ...topic,
        courseTotal,
      };
    })
  );

    return {
      topics: topicsWithCourseCount,
      topicTotal,
      topicPage,
      topicLimit,
      topicTotalPages: Math.ceil(topicTotal / topicLimit),
    };
  }

  async addCourseToTopic(dto: AddCourseToTopicDto) {
    const { courseId, topicId, relevance = 1 } = dto;

    const topic = await this.prisma.topic.findUnique({ where: { id: topicId } });
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });

    if (!topic || !course) throw new NotFoundException('Curso ou Tópico não encontrado');

    return this.prisma.courseTopic.upsert({
      where: { courseId_topicId: { courseId: courseId, topicId: topicId } },
      update: { relevance },
      create: { courseId, topicId, relevance },
    });
  }

}
