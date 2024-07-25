import { inject, injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { InjectionKeys } from '../InjectionKeys';
import { Constantes } from '../Constantes';
import { CustomerPersistenceOutputPort } from '../../application/ports/output/CustomerPersistenceOutputPort';
import { CustomerServiceInputPort } from '../../application/ports/input/CustomerServiceInputPort';
import { AgentPersistenceOutputPort } from '../../application/ports/output/AgentPersistenceOutputPort';
import { Customer, CustomerStatus } from '../domain/models/Customer';
import { Address } from '../domain/models/Address';
import { BadRequestError } from '../../helpers/errors/BadRequestError';
import { CustomerCreateYupValidator } from '../../helpers/validators/CustomerCreateValidator';
import { NotFoundError } from '../../helpers/errors/NotFoundError';
import { CustomerUpdateYupValidator } from '../../helpers/validators/CustomerUpdateValidator';
import { Agent, AgentStatus } from '../domain/models/Agent';
import { OutputListCustomerDto } from '../dto/CustomerDto';

@injectable()
export class CustomerService implements CustomerServiceInputPort {
  constructor(
    @inject(InjectionKeys.CUSTOMER_PERSISTENCE_OUTPUT_PORT)
    private readonly customerPersistence: CustomerPersistenceOutputPort,
    @inject(InjectionKeys.AGENT_PERSISTENCE_OUTPUT_PORT)
    private readonly agentPersistence: AgentPersistenceOutputPort,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const agentsActives: any = await this.agentPersistence.findAllByStatus(
      AgentStatus.Active,
    );
    await this.verifyCustomerIsValid(customer, agentsActives);

    const customersData: any = await this.customerPersistence.findAll();
    let indexNextAgent = 0;

    const customers = customersData.customers;
    if (customers.length > 0) {
      const lastCustomer = customers[customers.length - 1];

      const lastAgentId: any = await this.agentPersistence.findById(
        lastCustomer.agentId.toString(),
      );

      const indexLastAgent = agentsActives.findIndex(
        (agent: any) => agent.id.toString() === lastAgentId._id.toString(),
      );

      indexNextAgent = (indexLastAgent + 1) % agentsActives.length;
    }

    const nextAgentId: any = agentsActives[indexNextAgent];

    const customerCreated = new Customer(
      customer.name,
      customer.email,
      customer.phone,
      new Address(
        customer.address.zipcode,
        customer.address.street,
        customer.address.number,
        customer.address.bairro,
        customer.address.city,
        customer.address.complement,
      ),
      CustomerStatus.WaitingAttendance,
      nextAgentId.id.toString(),
      0,
    );

    const customerSaved = await this.customerPersistence.save(customerCreated);

    return {
      id: customerSaved.id,
      name: customerSaved.name,
      email: customerSaved.email,
      phone: customerSaved.phone,
      address: {
        zipcode: customerSaved.address.zipcode,
        street: customerSaved.address.street,
        number: customerSaved.address.number,
        bairro: customerSaved.address.bairro,
        city: customerSaved.address.city,
        complement: customerSaved.address.complement,
      },
      status: customerSaved.status,
      agentId: customerSaved.agentId,
      saleValue: customerSaved.saleValue,
    } as Customer;
  }

  async verifyCustomerIsValid(
    customer: Customer,
    agentsActives: Agent[],
  ): Promise<BadRequestError | void> {
    const customerCreatedIsValidate =
      CustomerCreateYupValidator.validate(customer);

    if (customerCreatedIsValidate?.errors) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        customerCreatedIsValidate?.errors,
      );
    }

    const emailExists = await this.customerPersistence.findByEmail(
      customer.email,
    );
    if (emailExists) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        'Cliente já existente por e-mail.',
      );
    }

    if (agentsActives.length === 0) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        'Nenhum agente encontrado.',
      );
    }
  }
  async update(id: string, customer: Customer): Promise<void> {
    await this.findOne(id);

    const customerUpdatedIsValidate =
      CustomerUpdateYupValidator.validate(customer);

    if (customerUpdatedIsValidate?.errors) {
      throw new BadRequestError(
        Constantes.httpMessages.BAD_REQUEST_ERROR,
        customerUpdatedIsValidate?.errors,
      );
    }

    await this.customerPersistence.update(id, customer);
  }

  async findOne(id: string): Promise<Customer> {
    const customer: any = await this.customerPersistence.findById(id);
    if (!customer) {
      throw new NotFoundError(
        Constantes.httpMessages.NOT_FOUND_ERROR,
        'Cliente não encontrado por id.',
      );
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: {
        zipcode: customer.address.zipcode,
        street: customer.address.street,
        number: customer.address.number,
        bairro: customer.address.bairro,
        city: customer.address.city,
        complement: customer.address.complement,
      },
      status: customer.status,
      agentId: customer.agentId,
      saleValue: customer.saleValue,
    } as Customer;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);

    await this.customerPersistence.delete(id);
  }

  async generateReport(
    startDate: string,
    endDate: string,
    statusCustomer: string,
    agentId: string,
  ): Promise<OutputListCustomerDto[]> {
    const query: any = {};

    if (startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00.000Z`);
      const end = new Date(`${endDate}T23:59:59.999Z`);

      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }

    if (statusCustomer) {
      query.status = statusCustomer;
    }

    if (agentId) {
      query.agentId = new ObjectId(agentId);
    }

    if (startDate && endDate && statusCustomer && agentId) {
      return await this.findAll();
    }

    const customers = await this.customerPersistence.findAllByQuery(query);

    const listCustomers = customers.map((customer: any) => ({
      id: customer._id.toString(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
      saleValue: customer.saleValue,
      agent: {
        id: customer.agentDetails?._id.toString() || '',
        name: customer.agentDetails?.name || '',
      },
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));

    return listCustomers;
  }

  async findAll(
    search?: string,
    page?: string,
    limit?: string,
  ): Promise<OutputListCustomerDto[]> {
    const customersData: any = await this.customerPersistence.findAll(
      search,
      Number(page),
      Number(limit),
    );

    const customers = customersData?.customers.map((customer: any) => {
      return {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        status: customer.status,
        saleValue: customer.saleValue,
        agent:
          customer.agentDetails && customer.agentDetails.length > 0
            ? {
                id: customer.agentDetails[0]._id.toString(),
                name: customer.agentDetails[0].name,
              }
            : null,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      };
    });

    return { customers, total: customersData.total };
  }
}
