import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email or password' })
  email: string;

  @IsString()
  @Length(6, 64)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  token: string;
}
