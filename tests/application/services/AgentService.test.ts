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

describe('AgentService tests', () => {
  const mockAgentPersistenceAdapter = createMock<AgentPersistenceOutputPort>();
  const agentService = new AgentService(mockAgentPersistenceAdapter);

  test('create_whenAgentInvalid_returnBadRequestError', async () => {
    expect(async () => {
      await agentService.create({ name: '' } as Agent);
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  test('create_whenAgentValid_returnSuccess', async () => {
    mockAgentPersistenceAdapter.findByName = jest.fn(async () => null);
    mockAgentPersistenceAdapter.save = jest.fn(
      async () => new Agent(agent.name, AgentStatus.Active, '1'),
    );

    const agent = { name: 'Agent test' } as Agent;

    const createdAgent = await agentService.create(agent);

    expect(createdAgent.name).toEqual('Agent test');
    expect(createdAgent.status).toEqual(AgentStatus.Active);
    expect(async () => {
      createdAgent;
    }).not.toThrow(BaseError);
  });

  test('findOne_whenAgentValid_returnSuccess', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(
      async () => new Agent('Agent test', AgentStatus.Active, '123'),
    );

    const agent = await agentService.findOne('123');

    expect(async () => {
      agent;
    }).not.toThrow(BaseError);
    expect(agent.name).toEqual('Agent test');
    expect(agent.status).toEqual(AgentStatus.Active);
    expect(agent.id).toEqual('123');
  });

  test('findOne_whenIdInvalid_returnNotFoundError', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await agentService.findOne('123');
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('update_whenAgentValid_returnSuccess', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(
      async () => new Agent('Agent test', AgentStatus.Active, '123'),
    );
    const agent = {
      name: 'Agent test update',
      status: AgentStatus.Inactive,
    } as Agent;

    const agentUpdated = await agentService.update('123', agent);

    expect(async () => {
      agentUpdated;
    }).not.toThrow(BaseError);
  });

  test('update_whenIdInvalid_returnNotFoundError', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await agentService.update(
        '123',
        new Agent('Agent test update', AgentStatus.Inactive),
      );
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('delete_whenAgentValid_returnSuccess', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(
      async () => new Agent('Agent test', AgentStatus.Active, '123'),
    );

    expect(async () => {
      await agentService.delete('123');
    }).not.toThrow(BaseError);
  });

  test('delete_whenIdInvalid_returnNotFoundError', async () => {
    mockAgentPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await agentService.delete('123');
    }).rejects.toBeInstanceOf(NotFoundError);
  });
});
