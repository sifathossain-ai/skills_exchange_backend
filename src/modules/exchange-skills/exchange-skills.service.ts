import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExchangeSkill,
  ExchangeStatus,
} from 'src/entities/exchange-skill-entity';
import { Skill } from 'src/entities/skill-entity';
import { User } from 'src/entities/user-entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeSkillsService {
  constructor(
    @InjectRepository(ExchangeSkill)
    private exchangeSkillsRepository: Repository<ExchangeSkill>,
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  async exchange(postId: string, proposerId: string, skillOffered: string) {
    const skillPost = await this.skillRepo.findOne({
      where: { id: postId },
      relations: ['creator'],
    });

    if (!skillPost) {
      throw new NotFoundException('Skill post not found!');
    }

    if (skillPost.creator.id.toString() === proposerId.toString()) {
      throw new BadRequestException(
        'You cannot request an exchange for your own skill post',
      );
    }

    const exchangeSkill = this.exchangeSkillsRepository.create({
      post: { id: postId } as Skill,
      proposer: { id: proposerId } as unknown as User,
      skillOffered,
      status: ExchangeStatus.PENDING,
    });

    return await this.exchangeSkillsRepository.save(exchangeSkill);
  }
}
