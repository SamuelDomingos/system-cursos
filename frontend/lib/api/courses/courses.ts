import http from '@/utils/http';
import { PaginatedResponse } from '@/lib/api/types/pagination';
import { Course, CreateCourseDto, UpdateCourseDto } from '@/lib/api/types/courses';

export const createCourse = async (dto: CreateCourseDto): Promise<Course> => {
  const result = await http.post<Course>('/courses', dto);
  return result;
};

export const findAllCourses = async (
  page = 1,
  limit = 10,
  search = ''
): Promise<PaginatedResponse<Course>> => {
  const result = await http.get<PaginatedResponse<Course>>('/courses', {
    params: { page, limit, search },
  });
  return result;
};

export const findCourseById = async (id: string): Promise<Course> => {
  const result = await http.get<Course>(`/courses/${id}`);
  return result;
};

export const updateCourse = async (id: string, dto: UpdateCourseDto): Promise<Course> => {
  const result = await http.patch<Course>(`/courses/${id}`, dto);
  return result;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await http.delete(`/courses/${id}`);
};

export const findUserAvailableCourses = async (
  userId: string,
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<Course>> => {
  const result = await http.get<PaginatedResponse<Course>>(`/enrollments/user/${userId}`, {
    params: { userId, page, limit},
  });
  return result;
};