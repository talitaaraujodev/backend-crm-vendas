import { Address } from './Address';

export enum CustomerStatus {
  WaitingAttendance = 'WAITING_ATTENDANCE',
  InAttendance = 'IN_ATTENDANCE',
  ProposalMade = 'PROPOSAL_MADE',
  NotConcluded = 'NOT_CONCLUDED',
  Sold = 'SOLD',
}
export class Customer {
  private _id: string | undefined;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _address: Address;
  private _status: CustomerStatus;
  private _agentId: string;
  private _saleValue: number;

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
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._address = address;
    this._status = status;
    this._agentId = agentId;
    this._saleValue = saleValue;
  }
  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): Address {
    return this._address;
  }

  get status(): CustomerStatus {
    return this._status;
  }

  get agentId(): string {
    return this._agentId;
  }

  get saleValue(): number {
    return this._saleValue;
  }
}
