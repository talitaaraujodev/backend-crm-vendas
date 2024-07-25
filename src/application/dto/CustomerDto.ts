import { Address } from '../domain/models/Address';
import { CustomerStatus } from '../domain/models/Customer';

export interface ListCustomerDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  status: CustomerStatus;
  saleValue: number;
  agent: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface OutputListCustomerDto {
  customers: ListCustomerDto[];
  total: number;
}
