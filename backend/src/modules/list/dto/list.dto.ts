import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { ListType } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ListType)
  type?: ListType;
}

export class UpdateListDto extends PartialType(CreateListDto) {}