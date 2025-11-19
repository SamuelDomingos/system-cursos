import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto, AddCourseToTopicDto } from './dto/topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTopicDto) {
    return this.prisma.topic.create({ data: dto });
  }

  async findAll() {
    return this.prisma.topic.findMany({
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                thumbnail: true,
                price: true,
                duration: true,
                tags: true,
                instructor: { select: { id: true, name: true } },
              },
            },
          },
          orderBy: { relevance: 'desc' },
        },
      },
    });
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

  async findCoursesByTopic(topicSlug: string, page = 1, limit = 10) {
    const topic = await this.prisma.topic.findUnique({
      where: { slug: topicSlug },
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                thumbnail: true,
                price: true,
                duration: true,
                tags: true,
                instructor: { select: { id: true, name: true } },
              },
            },
          },
          orderBy: { relevance: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        },
      },
    });

    if (!topic) throw new NotFoundException('Tópico não encontrado');

    return topic;
  }
}
