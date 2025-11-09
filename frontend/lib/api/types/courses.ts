import { User } from "./users";
import { Module } from "./modules";

export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructor: Pick<User, 'id' | 'name'>;
  modules: Module[];
};

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