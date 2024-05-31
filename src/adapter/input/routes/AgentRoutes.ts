import { Request, Response, Router } from 'express';
import { injectable } from 'tsyringe';
import { AgentController } from '../controllers/AgentController';

@injectable()
export class AgentRoutes {
  private router: Router;
  private agentController: AgentController;

  constructor(agentController: AgentController) {
    this.router = Router();
    this.agentController = agentController;
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post('/api/v1/agents', this.create.bind(this));
    this.router.put('/api/v1/agents/:id', this.update.bind(this));
    this.router.delete('/api/v1/agents/:id', this.delete.bind(this));
    this.router.get('/api/v1/agents/:id', this.findOne.bind(this));
    this.router.get('/api/v1/agents', this.findAll.bind(this));
  }

  private async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return await this.agentController.create(request, response);
  }

  private async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return await this.agentController.update(request, response);
  }

  private async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return await this.agentController.delete(request, response);
  }

  private async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return await this.agentController.findOne(request, response);
  }

  private async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return await this.agentController.findAll(request, response);
  }

  public getRouter(): Router {
    return this.router;
  }
}
