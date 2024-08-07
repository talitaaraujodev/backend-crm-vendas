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
      email: agent.email,
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
        email: agent.email,
        status: agent.status,
        updatedAt: new Date(),
      },
    );
  }

  async delete(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.agentRepository.delete({ _id: objectId });
  }

  async findAll(
    search: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    let conditions = {};
    const searchRegex = new RegExp(search, 'i');

    if (search) {
      conditions = {
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { status: { $regex: searchRegex } },
          { createdAt: { $regex: searchRegex } },
        ],
      };
    }
    const skip = (page - 1) * limit;

    const agentsData = await this.agentRepository.find({
      where: conditions,
      skip: skip,
      take: limit,
    });

    const total = await this.agentRepository.count();

    const agents = agentsData.map(agent => {
      return {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        status: agent.status,
        createdAt: agent.createdAt,
      };
    });

    return { agents, total };
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
          email: agentActive.email,
          status: agentActive.status,
          createdAt: agentActive.createdAt,
        };
      }),
    ) as Agent[];
  }

  async findById(id: string): Promise<AgentEntity | null> {
    const objectId = new ObjectId(id);
    return (await this.agentRepository.findOne({
      where: { _id: objectId },
    })) as AgentEntity | null;
  }

  async findByName(name: string): Promise<AgentEntity | null> {
    return (await this.agentRepository.findOne({
      where: { name: name },
    })) as AgentEntity | null;
  }
  async findByEmail(email: string): Promise<AgentEntity | null> {
    return (await this.agentRepository.findOne({
      where: { email: email },
    })) as AgentEntity | null;
  }
}
