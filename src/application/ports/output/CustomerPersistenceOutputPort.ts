import { CustomerEntity } from '../../../adapter/output/persistense/entities/CustomerEntity';
import { Customer } from '../../../application/domain/models/Customer';

export interface CustomerPersistenceOutputPort {
  save(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(
    search?: string,
    page?: number,
    limit?: number,
  ): Promise<CustomerEntity[]>;
  findAllByQuery(query: object): Promise<CustomerEntity[]>;
  findById(id: string): Promise<CustomerEntity | null>;
  findByEmail(email: string): Promise<CustomerEntity | null>;
}
