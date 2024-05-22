import { Agent } from '../../../application/domain/models/Agent';
import {
  OutputCreateAgentDto,
  OutputFindOneAgentDto,
} from '../../dto/AgentDto';

export interface AgentServiceInputPort {
  create(agent: Agent): Promise<OutputCreateAgentDto>;
  update(id: string, agent: Agent): Promise<void>;
  findOne(id: string): Promise<OutputFindOneAgentDto>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Agent[]>;
}
