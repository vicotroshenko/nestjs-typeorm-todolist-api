import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  subscribers: [],
});
