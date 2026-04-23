/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExchangeSkillsService } from './exchange-skills.service';
import { JwtAuthGuard } from '../users/gaurds/jwt-guard';
import { ExchangeStatus } from 'src/entities/exchange-skill-entity';

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

  @Get('incoming')
  @UseGuards(JwtAuthGuard)
  async getMyIncomingRequests(@Req() req: any) {
    const userId = req.user.id;
    return this.exchangeSkillsService.getIncomingRequests(userId);
  }

  @Get('sent')
  @UseGuards(JwtAuthGuard)
  async getMySentRequests(@Req() req: any) {
    const userId = req.user.id;
    return this.exchangeSkillsService.getSentRequests(userId);
  }

  @Patch(':id/accept')
  @UseGuards(JwtAuthGuard)
  async acceptRequest(
    @Param('id') id: string,
    @Req() req: any,
    @Body('contactNumber') contactNumber: string,
  ) {
    return this.exchangeSkillsService.updateRequestStatus(
      id,
      req.user.id,
      ExchangeStatus.ACCEPTED,
      contactNumber,
    );
  }

  @Patch(':id/decline')
  @UseGuards(JwtAuthGuard)
  async declineRequest(@Param('id') id: string, @Req() req: any) {
    return this.exchangeSkillsService.updateRequestStatus(
      id,
      req.user.id,
      ExchangeStatus.REJECTED,
    );
  }
}
