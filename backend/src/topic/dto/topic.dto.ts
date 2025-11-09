export class CreateTopicDto {
  name: string;
  slug: string;
}

export class AddCourseToTopicDto {
  courseId: string;
  topicId: string;
  relevance?: number;
}
