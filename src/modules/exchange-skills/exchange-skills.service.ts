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

  async getIncomingRequests(userId: string): Promise<ExchangeSkill[]> {
    return await this.exchangeSkillsRepository.find({
      where: {
        status: ExchangeStatus.PENDING,
        post: {
          creator: { id: userId },
        },
      },
      relations: ['post', 'proposer'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getSentRequests(userId: string): Promise<ExchangeSkill[]> {
    return await this.exchangeSkillsRepository.find({
      where: {
        proposer: { id: userId },
      },
      relations: ['post', 'post.creator'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateRequestStatus(
    exchangeId: string,
    userId: string,
    newStatus: ExchangeStatus,
    contactNumber?: string,
  ): Promise<ExchangeSkill> {
    const exchange = await this.exchangeSkillsRepository.findOne({
      where: { id: exchangeId },
      relations: ['post', 'post.creator'],
    });

    if (!exchange) {
      throw new NotFoundException('Exchange request not found');
    }

    if (exchange.post.creator.id !== userId) {
      throw new BadRequestException(
        'You are not authorized to update this request',
      );
    }

    exchange.status = newStatus;

    if (newStatus === ExchangeStatus.ACCEPTED && contactNumber) {
      exchange.contactNumber = contactNumber;
    }

    return await this.exchangeSkillsRepository.save(exchange);
  }
}
