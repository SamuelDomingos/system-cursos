import { Lesson } from "./lessons";

export type Module = {
  id: string;
  title: string;
  courseId: string;
  lessons: Lesson[];
};