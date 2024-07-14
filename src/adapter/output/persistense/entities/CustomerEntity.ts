import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'json' })
  address: {
    zipcode: string;
    street: string;
    number: string;
    bairro: string;
    city: string;
    complement: string;
  };

  @Column({ default: 'WAITING_ATTENDANCE' })
  status: string;

  @Column({ type: 'float' })
  saleValue: number;

  @Column('objectId')
  agentId: ObjectId;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date | undefined;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date | undefined;

  constructor(
    id: ObjectId,
    name: string,
    email: string,
    phone: string,
    address: any,
    status: string,
    saleValue: number,
    agentId: ObjectId,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
  ) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.status = status;
    this.saleValue = saleValue;
    this.agentId = agentId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
