import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApiController } from './api.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [ApiController],
})
export class ApiModule {}
