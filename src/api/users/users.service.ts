import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async saveUser(payload: DeepPartial<User>) {
    console.log('save user');
    return this.userRepository.save(payload);
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
