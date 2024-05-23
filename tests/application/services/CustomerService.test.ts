import { createMock } from 'ts-auto-mock';
import { CustomerService } from '../../../src/application/services/CustomerService';
import { CustomerPersistenceOutputPort } from '../../../src/application/ports/output/CustomerPersistenceOutputPort';
import { AgentPersistenceOutputPort } from '../../../src/application/ports/output/AgentPersistenceOutputPort';
import { BadRequestError } from '../../../src/helpers/errors/BadRequestError';
import { BaseError } from '../../../src/helpers/errors/BaseError';
import {
  Customer,
  CustomerStatus,
} from '../../../src/application/domain/models/Customer';
import { Address } from '../../../src/application/domain/models/Address';
import {
  Agent,
  AgentStatus,
} from '../../../src/application/domain/models/Agent';
import { NotFoundError } from '../../../src/helpers/errors/NotFoundError';

describe('CustomerService tests', () => {
  let mockAgentPersistenceAdapter: AgentPersistenceOutputPort;
  let mockCustomerPersistenceAdapter: CustomerPersistenceOutputPort;
  let customerService: CustomerService;

  beforeEach(() => {
    mockAgentPersistenceAdapter = createMock<AgentPersistenceOutputPort>();
    mockCustomerPersistenceAdapter =
      createMock<CustomerPersistenceOutputPort>();

    customerService = new CustomerService(
      mockCustomerPersistenceAdapter,
      mockAgentPersistenceAdapter,
    );
  });

  test('create_whenCustomerInvalid_returnBadRequestError', async () => {
    mockCustomerPersistenceAdapter.findByEmail = jest.fn(async () => null);
    expect(async () => {
      await customerService.create(
        new Customer(
          '',
          'test@gmail.com.br',
          '85999999999',
          new Address(
            'zipcode_test',
            'street_test',
            'number_test',
            'bairro_test',
            'city_test',
            'complement_test',
          ),
          CustomerStatus.WaitingAttendance,
          '123',
          0,
        ),
      );
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  test('create_whenCustomerValid_returnSuccess', async () => {
    const customer = new Customer(
      'Customer test',
      'test@gmail.com.br',
      '85999999999',
      new Address(
        'zipcode_test',
        'street_test',
        'number_test',
        'bairro_test',
        'city_test',
        'complement_test',
      ),
      CustomerStatus.WaitingAttendance,
      '123',
      0,
      '123',
    );
    mockCustomerPersistenceAdapter.findByEmail = jest.fn(async () => null);
    mockAgentPersistenceAdapter.findAllByStatus = jest.fn(async () => {
      const agents = [
        {
          agent: new Agent('Agent test update', AgentStatus.Inactive, '123'),
        },
      ];
      return agents.map(({ agent }) => agent);
    });

    mockCustomerPersistenceAdapter.save = jest.fn(async () => {
      return customer;
    });

    const createdCustomer = await customerService.create(customer);

    expect(createdCustomer.id).toEqual('123');
    expect(createdCustomer.name).toEqual('Customer test');
    expect(createdCustomer.email).toEqual('test@gmail.com.br');
    expect(createdCustomer.status).toEqual(CustomerStatus.WaitingAttendance);
    expect(async () => {
      createdCustomer;
    }).not.toThrow(BaseError);
  });

  test('findOne_whenCustomerValid_returnSuccess', async () => {
    mockCustomerPersistenceAdapter.findById = jest.fn(
      async () =>
        new Customer(
          'Customer test',
          'test@gmail.com.br',
          '85999999999',
          new Address(
            'zipcode_test',
            'street_test',
            'number_test',
            'bairro_test',
            'city_test',
            'complement_test',
          ),
          CustomerStatus.WaitingAttendance,
          '123',
          0,
          '123',
        ),
    );

    const createdCustomer = await customerService.findOne('123');

    expect(async () => {
      createdCustomer;
    }).not.toThrow(BaseError);
    expect(createdCustomer.id).toEqual('123');
    expect(createdCustomer.name).toEqual('Customer test');
    expect(createdCustomer.email).toEqual('test@gmail.com.br');
  });

  test('findOne_whenIdInvalid_returnNotFoundError', async () => {
    mockCustomerPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await customerService.findOne('123');
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('update_whenCustomerValid_returnSuccess', async () => {
    const customer = new Customer(
      'Customer test update',
      'test@gmail.com.br',
      '85999999999',
      new Address(
        'zipcode_test',
        'street_test',
        'number_test',
        'bairro_test',
        'city_test',
        'complement_test',
      ),
      CustomerStatus.WaitingAttendance,
      '123',
      0,
      '123',
    );
    mockCustomerPersistenceAdapter.findById = jest.fn(async () => customer);

    const customerUpdated = await customerService.update('123', customer);

    expect(async () => {
      customerUpdated;
    }).not.toThrow(BaseError);
  });

  test('update_whenIdInvalid_returnNotFoundError', async () => {
    mockCustomerPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await customerService.update(
        '123',
        new Customer(
          'Customer test update',
          'test@gmail.com.br',
          '85999999999',
          new Address(
            'zipcode_test',
            'street_test',
            'number_test',
            'bairro_test',
            'city_test',
            'complement_test',
          ),
          CustomerStatus.WaitingAttendance,
          '123',
          0,
          '123',
        ),
      );
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  test('delete_whenCustomerValid_returnSuccess', async () => {
    const customer = new Customer(
      'Customer test update',
      'test@gmail.com.br',
      '85999999999',
      new Address(
        'zipcode_test',
        'street_test',
        'number_test',
        'bairro_test',
        'city_test',
        'complement_test',
      ),
      CustomerStatus.WaitingAttendance,
      '123',
      0,
      '123',
    );
    mockCustomerPersistenceAdapter.findById = jest.fn(async () => customer);

    expect(async () => {
      await customerService.delete('123');
    }).not.toThrow(BaseError);
  });

  test('delete_whenIdInvalid_returnNotFoundError', async () => {
    mockCustomerPersistenceAdapter.findById = jest.fn(async () => null);

    expect(async () => {
      await customerService.delete('123');
    }).rejects.toBeInstanceOf(NotFoundError);
  });
});
