import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class AddCourseToTopicDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  topicId: string;

  @IsNumber()
  @IsOptional()
  relevance?: number;
}
