import { Customer } from '../../../application/domain/models/Customer';

export interface CustomerPersistenceOutputPort {
  save(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
}
