import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email or password' })
  email: string;

  @IsString()
  @Length(6, 64)
  @IsNotEmpty()
  password: string;
}
