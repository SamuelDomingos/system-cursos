import { IsEmail, IsOptional, IsString, IsNotEmpty, IsUUID, IsArray, ArrayMinSize } from 'class-validator';

export class CreateCheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID(undefined, { each: true })
  courseIds: string[];

  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}