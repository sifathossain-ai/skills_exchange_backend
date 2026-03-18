import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeSkillsService } from './exchange-skills.service';

describe('ExchangeSkillsService', () => {
  let service: ExchangeSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeSkillsService],
    }).compile();

    service = module.get<ExchangeSkillsService>(ExchangeSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
