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
    this.router.post('/api/v1/customers', this.createCustomer.bind(this));
    this.router.put('/api/v1/customers/:id', this.updateCustomer.bind(this));
    this.router.delete('/api/v1/customers/:id', this.deleteCustomer.bind(this));
    this.router.get('/api/v1/customers/:id', this.getCustomer.bind(this));
    this.router.get('/api/v1/customers', this.getAllCustomers.bind(this));
  }

  private async createCustomer(req: Request, res: Response): Promise<Response> {
    return await this.customerController.create(req, res);
  }

  private async updateCustomer(req: Request, res: Response): Promise<Response> {
    return await this.customerController.update(req, res);
  }

  private async deleteCustomer(req: Request, res: Response): Promise<Response> {
    return await this.customerController.delete(req, res);
  }

  private async getCustomer(req: Request, res: Response): Promise<Response> {
    return await this.customerController.findOne(req, res);
  }

  private async getAllCustomers(
    req: Request,
    res: Response,
  ): Promise<Response> {
    return await this.customerController.findAll(req, res);
  }

  public getRouter(): Router {
    return this.router;
  }
}
