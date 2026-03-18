import { Controller } from '@nestjs/common';
import { ExchangeSkillsService } from './exchange-skills.service';

@Controller('exchange-skills')
export class ExchangeSkillsController {
  constructor(private readonly exchangeSkillsService: ExchangeSkillsService) {}
}
