import { inject, injectable } from 'tsyringe';
import { BadRequestError } from '../../helpers/errors/BadRequestError';
import { AgentCreateYupValidator } from '../../helpers/validators/AgentCreateValidator';
import { AgentServiceInputPort } from '../../application/ports/input/AgentServiceInputPort';
import { Agent, AgentStatus } from '../domain/models/Agent';
import { InjectionKeys } from '../InjectionKeys';
import { AgentPersistenceOutputPort } from '../../application/ports/output/AgentPersistenceOutputPort';
import { Constantes } from '../Constantes';
import { NotFoundError } from '../../helpers/errors/NotFoundError';
import { AgentUpdateYupValidator } from '../../helpers/validators/AgentUpdateValidator';
import { OutputCreateAgentDto, OutputFindOneAgentDto } from '../dto/AgentDto';

@injectable()
export class AgentService implements AgentServiceInputPort {
  constructor(
    @inject(InjectionKeys.AGENT_PERSISTENCE_OUTPUT_PORT)
    private readonly agentPersistence: AgentPersistenceOutputPort,
  ) {}

  async create(agent: Agent): Promise<OutputCreateAgentDto> {
    const agentCreatedIsValidate = AgentCreateYupValidator.validate(agent);

    if (agentCreatedIsValidate?.errors) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        agentCreatedIsValidate?.errors,
      );
    }

    const nameExists = await this.agentPersistence.findByName(agent.name);

    if (nameExists) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        'Agente já existente por nome.',
      );
    }

    const emailExists = await this.agentPersistence.findByEmail(agent.email);

    if (emailExists) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        'Agente já existente por e-mail.',
      );
    }

    const agentCreated = new Agent(agent.name, agent.email, AgentStatus.Active);

    const agentSaved: any = await this.agentPersistence.save(agentCreated);

    return {
      id: agentSaved.id,
      name: agentSaved.name,
      email: agentSaved.email,
      status: agentSaved.status,
      createdAt: agentSaved.createdAt,
    };
  }
  async update(id: string, agent: Agent): Promise<void> {
    await this.findOne(id);

    const agentUpdatedIsValidate = AgentUpdateYupValidator.validate(agent);

    if (agentUpdatedIsValidate?.errors) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        agentUpdatedIsValidate?.errors,
      );
    }

    await this.agentPersistence.update(id, agent);
  }
  async findOne(id: string): Promise<OutputFindOneAgentDto> {
    const agent: any = await this.agentPersistence.findById(id);

    if (!agent) {
      throw new NotFoundError(
        Constantes.httpMessages.NOT_FOUND_ERROR,
        'Agente não encontrado por id.',
      );
    }
    return {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      status: agent.status,
      createdAt: agent.createdAt,
    };
  }
  async delete(id: string): Promise<void> {
    await this.findOne(id);

    return await this.agentPersistence.delete(id);
  }
  async findAll(
    search?: string,
    page?: string,
    number?: string,
  ): Promise<Agent[]> {
    return await this.agentPersistence.findAll(
      search,
      Number(page),
      Number(number),
    );
  }
}
