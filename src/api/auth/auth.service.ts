import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

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
    console.log('isUserExist: ', isUserExist);

    if (isUserExist) {
      throw new ConflictException(
        'An account with this email is already exist',
      );
    }

    const hashPassword = await this.hashPassword(payload.password);

    this.usersService.saveUser({
      ...payload,
      password: hashPassword,
    });
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
