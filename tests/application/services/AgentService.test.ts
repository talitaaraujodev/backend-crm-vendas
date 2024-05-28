import { createMock } from 'ts-auto-mock';
import { AgentService } from '../../../src/application/services/AgentService';
import { AgentPersistenceOutputPort } from '../../../src/application/ports/output/AgentPersistenceOutputPort';
import {
  Agent,
  AgentStatus,
} from '../../../src/application/domain/models/Agent';
import { BadRequestError } from '../../../src/helpers/errors/BadRequestError';
import { BaseError } from '../../../src/helpers/errors/BaseError';
import { NotFoundError } from '../../../src/helpers/errors/NotFoundError';
import { AgentEntity } from '../../../src/adapter/output/persistense/entities/AgentEntity';
import { ObjectId } from 'mongodb';

describe('AgentService tests', () => {
  let mockAgentPersistenceAdapter: AgentPersistenceOutputPort;
  let agentService: AgentService;

  beforeEach(() => {
    mockAgentPersistenceAdapter = createMock<AgentPersistenceOutputPort>();
    agentService = new AgentService(mockAgentPersistenceAdapter);
  });

  test('create_whenAgentInvalid_returnBadRequestError', async () => {
    expect(async () => {
      await agentService.create({ name: '' } as Agent);
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  test('create_whenAgentValid_returnSuccess', async () => {
    const agent = { name: 'Agent test', email: 'test@test.com.br' } as Agent;

    mockAgentPersistenceAdapter.findByName = jest.fn(async () => null);
    mockAgentPersistenceAdapter.findByEmail = jest.fn(async () => null);
    mockAgentPersistenceAdapter.save = jest.fn(
      async () => new Agent(agent.name, agent.email, AgentStatus.Active, '1'),
    );

    const createdAgent = await agentService.create(agent);

    expect(createdAgent.name).toEqual(agent.name);
    expect(createdAgent.email).toEqual(agent.email);
    expect(createdAgent.status).toEqual(AgentStatus.Active);
    expect(async () => {
      createdAgent;
    }).not.toThrow(BaseError);
  });

  test('findOne_whenAgentValid_returnSuccess', async () => {
    const agent = new AgentEntity(
      new ObjectId(),
      'Agent test',
      'test@test.com.br',
      AgentStatus.Active,
      new Date(),
      new Date(),
    );
    mockAgentPersistenceAdapter.findById = jest.fn(async () => {
      return agent;
    });

    const finOneAgent = await agentService.findOne(agent._id.toString());

    expect(async () => {
      agent;
    }).not.toThrow(BaseError);
    expect(finOneAgent.name).toEqual(agent.name);
    expect(finOneAgent.email).toEqual(agent.email);
    expect(finOneAgent.status).toEqual(AgentStatus.Active);
  });

  test('findOne_whenIdInvalid_returnNotFoundError', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await agentService.findOne('123');
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('update_whenAgentValid_returnSuccess', async () => {
    const agent = {
      id: new ObjectId(),
      name: 'Agent test update',
      email: 'test@test.com.br',
      status: AgentStatus.Inactive,
    };

    mockAgentPersistenceAdapter.findById = jest.fn(
      async () =>
        new AgentEntity(agent.id, agent.name, agent.email, agent.status),
    );

    const agentUpdated = await agentService.update(
      agent.id.toString(),
      new Agent(agent.name, agent.email, agent.status, agent.id.toString()),
    );

    expect(async () => {
      agentUpdated;
    }).not.toThrow(BaseError);
  });

  test('update_whenIdInvalid_returnNotFoundError', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await agentService.update(
        '123',
        new Agent(
          'Agent test update',
          'test@test.com.br',
          AgentStatus.Inactive,
        ),
      );
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('delete_whenAgentValid_returnSuccess', async () => {
    const agent = {
      id: new ObjectId(),
      name: 'Agent test',
      email: 'test@test.com.br',
      status: AgentStatus.Inactive,
    };

    mockAgentPersistenceAdapter.findById = jest.fn(
      async () =>
        new AgentEntity(agent.id, agent.name, agent.email, agent.status),
    );

    expect(async () => {
      await agentService.delete(agent.id.toString());
    }).not.toThrow(BaseError);
  });

  test('delete_whenIdInvalid_returnNotFoundError', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await agentService.delete('123');
    }).rejects.toBeInstanceOf(NotFoundError);
  });
});
