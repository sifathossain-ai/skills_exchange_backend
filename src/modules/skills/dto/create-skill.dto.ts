/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty({ message: 'Teaching skill name is required' })
  @IsString({ message: 'Teaching skill name must be a string' })
  teachingSkill: string;

  @IsNotEmpty({ message: 'Skill thumbnail is required' })
  @IsString({ message: 'Skill thumbnail must be a url string' })
  @IsUrl()
  skillImage: string;

  @IsArray({ message: 'Wanted skills must be an array of strings' })
  @IsOptional()
  wantedSkills: string[];

  @IsString({ message: 'Description must be a string' })
  @MinLength(5, { message: 'Must ne at least 5 ch more' })
  description: string;

  @IsString({ message: 'Category must be a string' })
  category: string;
}
