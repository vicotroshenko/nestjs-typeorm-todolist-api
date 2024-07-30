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
    return this.userRepository.save(payload);
  }

  public async getUserByEmail(email: string) {
    console.log(email);
    return this.userRepository.findOne({
      where: { email },
    });
  }

  public async updateUser(email: string, data: DeepPartial<User>) {
    return this.userRepository.update(email, data);
  };
}
