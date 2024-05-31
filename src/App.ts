import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import swaggerDocument from './docs/swagger.json';

const css = fs.readFileSync(
  path.resolve(__dirname, '../node_modules/swagger-ui-dist/swagger-ui.css'),
  'utf8',
);
const options: swaggerUi.SwaggerUiOptions = {
  customCss: css,
};
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
      swaggerUi.setup(swaggerDocument, options),
    );
    this.app.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}`);
    });
  }
}
export default new App();
