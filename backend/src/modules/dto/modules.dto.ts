import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  courseId: number;
}

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  @IsString()
  @IsOptional()
  title?: string;
}
