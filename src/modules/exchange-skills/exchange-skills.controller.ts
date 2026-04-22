/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ExchangeSkillsService } from './exchange-skills.service';
import { JwtAuthGuard } from '../users/gaurds/jwt-guard';

@Controller('exchange-skills')
export class ExchangeSkillsController {
  constructor(private readonly exchangeSkillsService: ExchangeSkillsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request')
  async createExchange(
    @Body('postId') postId: string,
    @Body('skillOffered') skillOffered: string,
    @Req() req: any,
  ) {
    const proposerId = req.user.id;
    return this.exchangeSkillsService.exchange(
      postId,
      proposerId,
      skillOffered,
    );
  }
}
