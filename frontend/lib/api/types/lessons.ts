export type Lesson = {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  content?: string;
  moduleId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseModuleLesson = {
  id: string;
  title: string;
  content: string;
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: CourseModuleLesson[];
};

export type Instructor = {
  id: string;
  name: string;
  avatar: string | null;
};

export type CourseStructure = {
  title: string;
  description: string;
  modules: CourseModule[];
  instructor: Instructor;
};

export type LessonDetailsResponse = {
  lesson: Lesson;
  courseStructure: CourseStructure;
};