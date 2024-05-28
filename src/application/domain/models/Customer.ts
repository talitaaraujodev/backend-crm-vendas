import { Address } from './Address';

export enum CustomerStatus {
  WaitingAttendance = 'WAITING_ATTENDANCE',
  InAttendance = 'IN_ATTENDANCE',
  ProposalMade = 'PROPOSAL_MADE',
  NotConcluded = 'NOT_CONCLUDED',
  Sold = 'SOLD',
}
export class Customer {
  id: string | undefined;
  name: string;
  email: string;
  phone: string;
  address: Address;
  status: CustomerStatus;
  agentId: string;
  saleValue: number;

  constructor(
    name: string,
    email: string,
    phone: string,
    address: Address,
    status: CustomerStatus,
    agentId: string,
    saleValue: number,
    id?: string | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.status = status;
    this.agentId = agentId;
    this.saleValue = saleValue;
  }
}
