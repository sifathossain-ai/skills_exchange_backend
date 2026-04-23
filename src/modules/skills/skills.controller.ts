import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  async create(
    @Body() createSkillDto: CreateSkillDto,
    @CurrentUser() user: User,
  ) {
    return this.skillsService.createSkill(createSkillDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-skills')
  async findMyPost(@CurrentUser() user: User) {
    return this.skillsService.findMySkill(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  async findOneSkill(@Param('id') id: string) {
    return this.skillsService.findOneSkill(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeSkill(@Param('id') id: string, @CurrentUser() user: User) {
    await this.skillsService.remove(id, user);
    return { message: 'Skill deleted successfully' };
  }
}
