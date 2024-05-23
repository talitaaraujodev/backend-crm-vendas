import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Agent, AgentStatus } from '../../../application/domain/models/Agent';
import { AgentPersistenceOutputPort } from '../../../application/ports/output/AgentPersistenceOutputPort';
import { AgentEntity } from './entities/AgentEntity';
import { AppDataSource } from '../../../config/database/ormConfig';

export class AgentPersistenceAdapter implements AgentPersistenceOutputPort {
  private readonly agentRepository: Repository<AgentEntity> =
    AppDataSource.getRepository(AgentEntity);

  async save(agent: Agent): Promise<Agent> {
    const agentEntitySaved: any = await this.agentRepository.save({
      _id: new ObjectId(),
      name: agent.name,
      status: agent.status,
    });

    return new Agent(
      agentEntitySaved.id,
      agentEntitySaved.name,
      agentEntitySaved.status,
    );
  }

  async update(id: string, agent: Agent): Promise<void> {
    await this.agentRepository.update(
      { _id: new ObjectId(id) },
      {
        name: agent.name,
        status: agent.status,
        updatedAt: new Date(),
      },
    );
  }

  async delete(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.agentRepository.delete({ _id: objectId });
  }

  async findAll(): Promise<Agent[]> {
    const agents = await this.agentRepository.find();
    return Object.assign(
      agents.map(agent => {
        return {
          id: agent._id,
          name: agent.name,
          status: agent.status,
          createdAt: agent.createdAt,
        };
      }),
    ) as Agent[];
  }

  async findAllByStatus(status: AgentStatus): Promise<Agent[]> {
    const activeAgents = await this.agentRepository.find({
      order: {
        name: 'ASC',
      },
      where: { status: status },
    });
    return Object.assign(
      activeAgents.map(agentActive => {
        return {
          id: agentActive._id,
          name: agentActive.name,
          status: agentActive.status,
          createdAt: agentActive.createdAt,
        };
      }),
    ) as Agent[];
  }

  async findById(id: string): Promise<Agent | null> {
    const objectId = new ObjectId(id);
    const agent = (await this.agentRepository.findOne({
      where: { _id: objectId },
    })) as Agent | null;

    return agent;
  }

  async findByName(name: string): Promise<Agent | null> {
    const agent = (await this.agentRepository.findOne({
      where: { name: name },
    })) as Agent | null;

    return agent;
  }
}
