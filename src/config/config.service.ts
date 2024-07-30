import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

class NewConfigService extends NestConfigService {
  public retrieveTypeormConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getOrThrow('POSTGRES_URL'),
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: false,
    };
  }
}

export const configService = new NewConfigService();
