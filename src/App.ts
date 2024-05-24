import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from './docs/swagger.json';
export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public listen(port: number, routes: Router[]): void {
    this.app.use(routes);
    this.app.use(
      '/api/v1/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
    this.app.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}`);
    });
  }
}
export default new App();
