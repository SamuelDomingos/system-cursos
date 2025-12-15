import http from '@/utils/http';
import { Lesson, LessonDetailsResponse } from '@/lib/api/types/lessons';

export const createLessons = async (dto: Lesson): Promise<Lesson> => {
  const result = await http.post<Lesson>('/lessons', dto);
  return result;
};

export const findLessonById = async (id: string): Promise<LessonDetailsResponse> => {
  const result = await http.get<LessonDetailsResponse>(`/lessons/${id}`);
  return result;
};

export const updateLesson = async (id: string, dto: Lesson): Promise<Lesson> => {
  const result = await http.patch<Lesson>(`/lessons/${id}`, dto);
  return result;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await http.delete(`/lessons/${id}`);
};