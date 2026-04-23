import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findMySkill(user: User): Promise<Skill[]> {
    return await this.skillRepository.find({
      where: {
        creator: { id: user.id },
      },
      order: { createdDate: 'DESC' },
    });
  }

  async findOneSkill(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id },
      relations: ['creator'],
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return skill;
  }

  async remove(id: string, user: User): Promise<void> {
    const result = await this.skillRepository.delete({
      id: id,
      creator: { id: user.id },
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Skill with ID ${id} not found or you don't have permission to delete it`,
      );
    }
  }
}
