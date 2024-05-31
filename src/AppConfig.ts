import { Router } from 'express';
import { container } from 'tsyringe';
import { InjectionKeys } from './application/InjectionKeys';
import { AgentService } from './application/services/AgentService';
import { CustomerService } from './application/services/CustomerService';
import { AgentController } from './adapter/input/controllers/AgentController';
import { CustomerController } from './adapter/input/controllers/CustomerController';
import { AgentPersistenceAdapter } from './adapter/output/persistense/AgentPersistenceAdapter';
import { CustomerPersistenceAdapter } from './adapter/output/persistense/CustomerPersistenceAdapter';
import { AppDataSource } from './config/database/ormConfig';
import { AgentRoutes } from './adapter/input/routes/AgentRoutes';
import { CustomerRoutes } from './adapter/input/routes/CustomerRoutes';

export class AppConfig {
  public async initialize(): Promise<Router[]> {
    this.registerDependencies();
    await this.initializeDatabase();
    return this.getRoutes();
  }

  private registerDependencies(): void {
    container.register(InjectionKeys.AGENT_SERVICE_INPUT_PORT, {
      useClass: AgentService,
    });
    container.register(InjectionKeys.AGENT_PERSISTENCE_OUTPUT_PORT, {
      useClass: AgentPersistenceAdapter,
    });
    container.register(InjectionKeys.CUSTOMER_SERVICE_INPUT_PORT, {
      useClass: CustomerService,
    });
    container.register(InjectionKeys.CUSTOMER_PERSISTENCE_OUTPUT_PORT, {
      useClass: CustomerPersistenceAdapter,
    });
    container.register(InjectionKeys.AGENT_CONTROLLER, {
      useClass: AgentController,
    });
    container.register(InjectionKeys.CUSTOMER_CONTROLLER, {
      useClass: CustomerController,
    });
  }

  private async initializeDatabase(): Promise<void> {
    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err: any) => {
        console.error('Error during Data Source initialization:', err);
      });
  }

  public getRoutes(): Router[] {
    const agentRoutes = container.resolve(AgentRoutes).getRouter();
    const customerRoutes = container.resolve(CustomerRoutes).getRouter();

    return [agentRoutes, customerRoutes];
  }
}
export default new AppConfig();
