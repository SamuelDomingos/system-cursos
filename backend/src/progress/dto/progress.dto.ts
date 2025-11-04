import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  lessonId: number;

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
