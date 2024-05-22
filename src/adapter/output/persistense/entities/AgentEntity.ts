import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
} from 'typeorm';
import { AgentStatus } from '../../../../application/domain/models/Agent';

@Entity({ name: 'agents' })
export class AgentEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  name: string;

  @Column({ default: AgentStatus.Active })
  status: string;

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
    status: string,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
  ) {
    this._id = id;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
