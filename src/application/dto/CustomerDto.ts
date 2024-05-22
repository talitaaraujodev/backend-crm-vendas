import { Address } from '../domain/models/Address';
import { CustomerStatus } from '../domain/models/Customer';

export interface OutputListCustomerDto {
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
  };
}
