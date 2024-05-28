export enum AgentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
export class Agent {
  id: string | undefined;
  name: string;
  email: string;
  status: AgentStatus;

  constructor(
    name: string,
    email: string,
    status: AgentStatus,
    id?: string | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
  }
}
