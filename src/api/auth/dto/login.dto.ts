import {
  IsEmail,
  Length,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email or password' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 64)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  token: string;
}
