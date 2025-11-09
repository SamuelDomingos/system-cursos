import { Course } from './courses';
import { User } from './users';

export type Topic = {
  id: number;
  name: string;
  slug: string;
  courses?: CourseTopic[];
  createdAt: string;
  updatedAt: string;
};

export type CourseTopic = {
  course: Course;
  courseId: string;
  topic: Topic;
  topicId: number;
  relevance: number;
  createdAt: string;
};

export type CreateTopicDto = {
  name: string;
  slug: string;
};

export type AddCourseToTopicDto = {
  courseId: string;
  topicId: number;
  relevance?: number;
};