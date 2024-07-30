import { Response } from 'express';
import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { UserData } from '../users/decorators/user-data.decorator';
import { User } from '../users/entities/users.entity';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ) {
    const newUser = await this.authService.register(registerDto);

    res.status(201).send(newUser);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  public async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const token = this.authService.createToken(loginDto.email);

    const loginUser = await this.authService.login({
      ...loginDto,
      token,
    });

    res.send(loginUser);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  public async logout(@UserData() user: User, @Res() res: Response) {
    this.authService.logout(user.email);
    res.send({ message: 'Logout is successful' });
  }
}
