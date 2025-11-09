import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  courseId: string;
}
