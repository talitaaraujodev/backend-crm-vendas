import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CustomerController } from '../controllers/CustomerController';

@injectable()
export class CustomerRoutes {
  private router: Router;
  private customerController: CustomerController;

  constructor(customerController: CustomerController) {
    this.router = Router();
    this.customerController = customerController;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/api/v1/customers',
      async (request: Request, response: Response) => {
        await this.customerController.create(request, response);
      },
    );

    this.router.put(
      '/api/v1/customers/:id',
      async (request: Request, response: Response) => {
        await this.customerController.update(request, response);
      },
    );

    this.router.delete(
      '/api/v1/customers/:id',
      async (request: Request, response: Response) => {
        await this.customerController.delete(request, response);
      },
    );

    this.router.get(
      '/api/v1/customers/:id',
      async (request: Request, response: Response) => {
        await this.customerController.findOne(request, response);
      },
    );

    this.router.get(
      '/api/v1/customers',
      async (request: Request, response: Response) => {
        await this.customerController.findAll(request, response);
      },
    );
    this.router.get(
      '/api/v1/customers/generate/report',
      async (request: Request, response: Response) => {
        await this.customerController.generateReport(request, response);
      },
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
