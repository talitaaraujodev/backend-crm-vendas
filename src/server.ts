import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import app from './App';
import { agentsRoute } from './adapter/input/routes/agentsRoute';
import { customersRoute } from './adapter/input/routes/customersRoute';
import { AppDataSource } from './config/database/ormConfig';

AppDataSource.initialize();
app.listen(Number(process.env.PORT), [agentsRoute, customersRoute]);
