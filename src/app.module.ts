import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.retrieveTypeormConfig()),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
