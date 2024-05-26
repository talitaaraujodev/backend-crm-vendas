import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { AgentEntity } from '../../adapter/output/persistense/entities/AgentEntity';
import { CustomerEntity } from '../../adapter/output/persistense/entities/CustomerEntity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [AgentEntity, CustomerEntity],
});
