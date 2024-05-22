import express, { Router } from 'express';
import cors from 'cors';

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
    this.app.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}`);
    });
  }
}
export default new App();
