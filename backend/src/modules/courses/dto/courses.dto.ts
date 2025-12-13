import { IsNotEmpty, IsOptional, IsString, IsNumber, IsJSON, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CourseStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsJSON()
  @IsNotEmpty()
  tags: string;

  @IsString()
  @IsNotEmpty()
  instructorId: string;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}