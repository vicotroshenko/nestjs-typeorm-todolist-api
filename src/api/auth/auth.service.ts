import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }

  public createToken(data) {
    return this.jwtService.sign({ data });
  }

  public convertToken(token: string): { [x: string]: string } {
    return this.jwtService.decode(token);
  }

  public async register(payload: RegisterDto) {
    const isUserExist = await this.usersService.getUserByEmail(payload.email);

    if (isUserExist) {
      throw new ConflictException(
        'An account with this email is already exist',
      );
    }
    const token = this.createToken(payload.email);
    const hashPassword = await this.hashPassword(payload.password);

    return this.usersService.saveUser({
      ...payload,
      password: hashPassword,
      token,
    });
  }

  public async login(payload: LoginDto) {
    const isUserExist = await this.usersService.getUserByEmail(payload.email);

    if (!isUserExist) {
      throw new NotFoundException('User with a such email was not found');
    }
    const token = this.createToken(payload.email);
    return this.usersService.saveUser({
      ...isUserExist,
      token,
    });
  }

  public async logout(email: string) {
    const isUserExist = await this.usersService.getUserByEmail(email);

    if (!isUserExist) {
      throw new UnauthorizedException('Unauthorized');
    }

    this.usersService.saveUser({ ...isUserExist, token: '' });
  }

  public async validateUser(email: string, password: string) {
    const findUser = await this.usersService.getUserByEmail(email);

    if (!findUser) return null;

    const passwordCompare = await bcrypt.compare(password, findUser.password);

    if (passwordCompare) {
      const { password, ...result } = findUser;
      return result;
    }
    return null;
  }
}
