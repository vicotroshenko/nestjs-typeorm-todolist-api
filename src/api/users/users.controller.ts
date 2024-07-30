import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserData } from './decorators/user-data.decorator';
import { User } from './entities/users.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public async getMyAccount(@Req() req: Request) {
    return {
      user: 'this is user',
    };
  }
}
