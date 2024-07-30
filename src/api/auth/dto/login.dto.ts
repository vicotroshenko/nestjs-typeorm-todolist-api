import { IsEmail, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email or password' })
  email: string;

  @Length(6, 64)
  password: string;
}
