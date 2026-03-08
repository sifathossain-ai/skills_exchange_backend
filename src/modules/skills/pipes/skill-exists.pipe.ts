/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { SkillsService } from '../skills.service';

@Injectable()
export class SkillExsitsPipe implements PipeTransform {
  constructor(private readonly skillsService: SkillsService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.skillsService.findOne(value);
    } catch {
      throw new NotFoundException(`Skill with ID ${value} not found`);
    }

    return value;
  }
}
