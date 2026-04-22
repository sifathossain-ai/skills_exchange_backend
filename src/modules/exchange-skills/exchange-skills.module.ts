import { Module } from '@nestjs/common';
import { ExchangeSkillsService } from './exchange-skills.service';
import { ExchangeSkillsController } from './exchange-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeSkill } from 'src/entities/exchange-skill-entity';
import { Skill } from 'src/entities/skill-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeSkill, Skill])],
  controllers: [ExchangeSkillsController],
  providers: [ExchangeSkillsService],
})
export class ExchangeSkillsModule {}
