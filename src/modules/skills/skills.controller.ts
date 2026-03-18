import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../users/gaurds/jwt-guard';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from 'src/entities/user-entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('post')
  @UseGuards(JwtAuthGuard)
  create(@Body() createSkillDto: CreateSkillDto, @CurrentUser() user: User) {
    return this.skillsService.createSkill(createSkillDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-skills')
  findMyPost(@CurrentUser() user: User) {
    return this.skillsService.findMyPost(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.skillsService.findAll();
  }
}
