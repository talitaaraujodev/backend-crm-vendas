import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import app from './App';
import { agentsRoute } from './adapter/input/routes/agentsRoute';
import { customersRoute } from './adapter/input/routes/customersRoute';
import { AppDataSource } from './config/database/ormConfig';

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch(err => {
      console.error('Error during Data Source initialization:', err);
    });
  app.listen(Number(process.env.PORT), [agentsRoute, customersRoute]);
})();
