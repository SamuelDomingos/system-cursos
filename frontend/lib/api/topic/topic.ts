import http from '@/utils/http';
import { Topic, CreateTopicDto, AddCourseToTopicDto } from '@/lib/api/types/topic';
import { PaginatedResponse } from '@/lib/api/types/pagination';

export const createTopic = async (dto: CreateTopicDto): Promise<Topic> => {
  const result = await http.post<Topic>('/topics', dto);
  return result;
};

export const findAllTopics = async (
  page = 1,
  limit = 10,
  search = ''
): Promise<PaginatedResponse<Topic>> => {
  const result = await http.get<PaginatedResponse<Topic>>('/topics', {
    params: { page, limit, search },
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
