/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password Must be a String' })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must at least 6 ch' })
  password: string;
}
