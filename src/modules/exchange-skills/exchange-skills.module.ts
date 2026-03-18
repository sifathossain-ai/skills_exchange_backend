import { Module } from '@nestjs/common';
import { ExchangeSkillsService } from './exchange-skills.service';
import { ExchangeSkillsController } from './exchange-skills.controller';

@Module({
  controllers: [ExchangeSkillsController],
  providers: [ExchangeSkillsService],
})
export class ExchangeSkillsModule {}
