import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import app from './App';
import appConfig from './AppConfig';

(async () => {
  const routes = await appConfig.initialize();
  app.listen(Number(process.env.PORT), routes);
})();
