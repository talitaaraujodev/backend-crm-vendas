import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { InjectionKeys } from '../../../application/InjectionKeys';
import { AgentService } from '../../../application/services/AgentService';
import { AgentController } from '../controllers/AgentController';
import { AgentPersistenceAdapter } from '../../output/persistense/AgentPersistenceAdapter';

container.register(InjectionKeys.AGENT_SERVICE_INPUT_PORT, {
  useClass: AgentService,
});
container.register(InjectionKeys.AGENT_CONTROLLER, {
  useClass: AgentController,
});
container.register(InjectionKeys.AGENT_PERSISTENCE_OUTPUT_PORT, {
  useClass: AgentPersistenceAdapter,
});

const agentsRoute = Router();
const agentController: AgentController = container.resolve('AgentController');

agentsRoute.post(
  '/api/v1/agents',
  async (request: Request, response: Response) => {
    return await agentController.create(request, response);
  },
);

agentsRoute.put(
  '/api/v1/agents/:id',
  async (request: Request, response: Response) => {
    return await agentController.update(request, response);
  },
);

agentsRoute.delete(
  '/api/v1/agents/:id',
  async (request: Request, response: Response) => {
    return await agentController.delete(request, response);
  },
);

agentsRoute.get(
  '/api/v1/agents/:id',
  async (request: Request, response: Response) => {
    return await agentController.findOne(request, response);
  },
);

agentsRoute.get(
  '/api/v1/agents',
  async (request: Request, response: Response) => {
    return await agentController.findAll(request, response);
  },
);

export { agentsRoute };
