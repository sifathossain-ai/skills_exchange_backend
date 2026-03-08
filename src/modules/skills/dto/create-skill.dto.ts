/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @MinLength(5, { message: 'Must ne at least 5 ch more' })
  description: string;

  @IsString({ message: 'Category must be a string' })
  category: string;
}
