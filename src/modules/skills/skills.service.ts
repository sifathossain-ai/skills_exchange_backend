import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/entities/skill-entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { User } from 'src/entities/user-entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async createSkill(
    createSkillDto: CreateSkillDto,
    user: User,
  ): Promise<Skill> {
    const newSkill = this.skillRepository.create({
      ...createSkillDto,
      creator: user,
    });

    return await this.skillRepository.save(newSkill);
  }

  async findAll() {
    return this.skillRepository.find({
      order: { createdDate: 'DESC' },
    });
  }

  async findMyPost(user: User): Promise<Skill[]> {
    return await this.skillRepository.find({
      where: {
        creator: { id: user.id },
      },
      order: { createdDate: 'DESC' },
    });
  }
}
