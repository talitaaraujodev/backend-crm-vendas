import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { InjectionKeys } from '../../../application/InjectionKeys';
import { CustomerService } from '../../../application/services/CustomerService';
import { CustomerController } from '../controllers/CustomerController';
import { CustomerPersistenceAdapter } from '../../output/persistense/CustomerPersistenceAdapter';
import { AgentService } from '../../../application/services/AgentService';

container.register(InjectionKeys.AGENT_SERVICE_INPUT_PORT, {
  useClass: AgentService,
});
container.register(InjectionKeys.CUSTOMER_SERVICE_INPUT_PORT, {
  useClass: CustomerService,
});
container.register(InjectionKeys.CUSTOMER_CONTROLLER, {
  useClass: CustomerController,
});
container.register(InjectionKeys.CUSTOMER_PERSISTENCE_OUTPUT_PORT, {
  useClass: CustomerPersistenceAdapter,
});

const customersRoute = Router();
const customerController: CustomerController =
  container.resolve('CustomerController');

customersRoute.post(
  '/api/v1/customers',
  async (request: Request, response: Response) => {
    return await customerController.create(request, response);
  },
);
customersRoute.put(
  '/api/v1/customers/:id',
  async (request: Request, response: Response) => {
    return await customerController.update(request, response);
  },
);
customersRoute.delete(
  '/api/v1/customers/:id',
  async (request: Request, response: Response) => {
    return await customerController.delete(request, response);
  },
);
customersRoute.get(
  '/api/v1/customers/:id',
  async (request: Request, response: Response) => {
    return await customerController.findOne(request, response);
  },
);
customersRoute.get(
  '/api/v1/customers',
  async (request: Request, response: Response) => {
    return await customerController.findAll(request, response);
  },
);

export { customersRoute };
