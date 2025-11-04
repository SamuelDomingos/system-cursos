import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  courseId: number;
}
