import http from '@/utils/http';
import { Topic, CreateTopicDto, AddCourseToTopicDto, PaginationTopics } from '@/lib/api/types/topic';
import { PaginatedResponse } from '@/lib/api/types/pagination';

export const createTopic = async (dto: CreateTopicDto): Promise<Topic> => {
  const result = await http.post<Topic>('/topics', dto);
  return result;
};

export const findAllTopics = async (
  page: number = 1,
  limit: number = 10,
  coursePage?: number,
  courseLimit?: number,
): Promise<PaginationTopics> => {
  const result = await http.get<PaginationTopics>('/topics', {
    params: {
      topicPage: page,
      topicLimit: limit,
      coursePage,
      courseLimit,
    },
  });
  return result;
};

export const addCourseToTopic = async (dto: AddCourseToTopicDto): Promise<Topic> => {
  const result = await http.post<Topic>('/topics/add-course', dto);
  return result;
};

export const findCoursesByTopic = async (
  slug: string,
  page = 1,
  limit = 10,
  search = ''
): Promise<PaginatedResponse<Topic>> => {
  const result = await http.get<PaginatedResponse<Topic>>(`/topics/${slug}/courses`, {
    params: { page, limit, search },
  });
  return result;
};