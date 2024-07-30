import { Response } from 'express';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('/register')
  public async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ) {
    const token = this.authService.createToken(registerDto.email);

    const newUser = await this.authService.register({
      ...registerDto,
      token,
    });

    res.status(201).send(newUser);
  }
}
