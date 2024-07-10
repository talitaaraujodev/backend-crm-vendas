import { Customer } from '../../../application/domain/models/Customer';
import { OutputListCustomerDto } from '../../dto/CustomerDto';

export interface CustomerServiceInputPort {
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<void>;
  findOne(id: string): Promise<Customer>;
  delete(id: string): Promise<void>;
  generateReport(
    startDate: string,
    endDate: string,
    statusCustomer: string,
    agentId: string,
  ): Promise<OutputListCustomerDto[]>;
  findAll(search?: string): Promise<OutputListCustomerDto[]>;
}
