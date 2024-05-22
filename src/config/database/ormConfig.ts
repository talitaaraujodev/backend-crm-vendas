import { DataSource } from 'typeorm';
import { AgentEntity } from '../../adapter/output/persistense/entities/AgentEntity';
import { CustomerEntity } from '../../adapter/output/persistense/entities/CustomerEntity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  entities: [AgentEntity, CustomerEntity],
  synchronize: true,
  logging: true,
});
