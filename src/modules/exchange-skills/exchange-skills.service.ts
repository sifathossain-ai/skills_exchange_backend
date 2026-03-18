import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeSkill } from 'src/entities/exchange-skill-entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeSkillsService {
  constructor(
    @InjectRepository(ExchangeSkill)
    private exchangeSkillsRepository: Repository<ExchangeSkill>,
  ) {}
}
