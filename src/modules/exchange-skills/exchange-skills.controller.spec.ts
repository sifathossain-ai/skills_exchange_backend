import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeSkillsController } from './exchange-skills.controller';
import { ExchangeSkillsService } from './exchange-skills.service';

describe('ExchangeSkillsController', () => {
  let controller: ExchangeSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeSkillsController],
      providers: [ExchangeSkillsService],
    }).compile();

    controller = module.get<ExchangeSkillsController>(ExchangeSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
