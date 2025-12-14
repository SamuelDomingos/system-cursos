import {IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  @IsString()
  @IsOptional()
  title?: string;

}

export class CreateManyModulesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModuleDto)
  modules: CreateModuleDto[];
}
