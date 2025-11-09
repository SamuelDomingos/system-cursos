import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  lessonId: string;

  @IsOptional()
  @IsInt()
  watchTime?: number;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}
