import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from './modules/skills/skills.module';
import { User } from './entities/user-entity';
import { Skill } from './entities/skill-entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ExchangeSkill } from './entities/exchange-skill-entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: '@sifat143#',
      database: 'skills-exchange',
      entities: [Skill, User, ExchangeSkill],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
