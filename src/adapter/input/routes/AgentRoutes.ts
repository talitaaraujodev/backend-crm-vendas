import { Request, Response, Router } from 'express';
import { injectable } from 'tsyringe';
import { AgentController } from '../controllers/AgentController';

@injectable()
export class AgentRoutes {
  private router: Router;

  constructor(private agentController: AgentController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/api/v1/agents', async (request: Request, response: Response) => {
      await this.agentController.create(request, response);
    });

    this.router.put('/api/v1/agents/:id', async (request: Request, response: Response) => {
      await this.agentController.update(request, response);
    });

    this.router.delete('/api/v1/agents/:id', async (request: Request, response: Response) => {
      await this.agentController.delete(request, response);
    });

    this.router.get('/api/v1/agents/:id', async (request: Request, response: Response) => {
      await this.agentController.findOne(request, response);
    });

    this.router.get('/api/v1/agents', async (request: Request, response: Response) => {
      await this.agentController.findAll(request, response);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
