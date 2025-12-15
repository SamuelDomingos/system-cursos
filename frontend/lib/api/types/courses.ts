import { User } from "./users";
import { Module } from "./modules";

export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructor: Pick<User, 'id' | 'name'>;
  modules: Module[];
  lastLessonId: string;
};

export type CourseSingleUser = {
  course: Course;
  userProgress: {
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalWatchTime: number;
  };
}

export type CreateCourseDto = {
  title: string;
  description: string;
  thumbnail?: string;
  instructorId: number;
};

export type UpdateCourseDto = {
  title?: string;
  description?: string;
  thumbnail?: string;
};