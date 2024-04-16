import { Store } from '@/entity/store';
import { DataSource } from 'typeorm';

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres';
const POSTGRES_SSL = process.env.POSTGRES_SSL || false;

export const appDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  ssl: Boolean(POSTGRES_SSL),
  logging: true,
  entities: [Store],
  migrations: [],
  subscribers: [],
});
