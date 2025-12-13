import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @IsNotEmpty()
  moduleId: string;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;
}
