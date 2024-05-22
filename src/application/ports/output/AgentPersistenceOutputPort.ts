import { Agent, AgentStatus } from '../../../application/domain/models/Agent';

export interface AgentPersistenceOutputPort {
  save(agent: Agent): Promise<Agent>;
  update(id: string, agent: Agent): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Agent[]>;
  findAllByStatus(status: AgentStatus): Promise<Agent[]>;
  findById(id: string): Promise<Agent | null>;
  findByName(name: string): Promise<Agent | null>;
}
