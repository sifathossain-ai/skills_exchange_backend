/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entities/user-entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingEmail = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already in use!');
    }

    const newlyCreateUser = this.usersRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: await bcrypt.hash(registerDto.password, 10),
      role: UserRole.User,
    });

    const saveUser = await this.usersRepository.save(newlyCreateUser);

    const { password, ...result } = saveUser;
    return {
      user: result,
      message: 'Registration Successfully! Please login to continue.',
    };
  }

  async login(loginDto: LoginDto) {
    const userExist = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (
      !userExist ||
      !(await bcrypt.compare(loginDto.password, userExist.password))
    ) {
      throw new UnauthorizedException(
        'Invalid credentials or account not exists',
      );
    }

    const tokens = this.generateTokens(userExist);

    const { password, ...result } = userExist;
    return {
      user: result,
      ...tokens,
    };
  }

  async getUserById(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User Not Found!');
    }
    const { password, ...result } = user;
    return result;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: 'refresh_secret_key',
      });

      const userExist = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });
      if (!userExist) throw new UnauthorizedException('Invalid Token!');

      const accessToken = this.generateAccessToken(userExist);
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
  }

  private generateTokens(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '1m',
    });
  }

  private generateRefreshToken(user: User): string {
    const payload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
