export enum AgentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
export class Agent {
  private _id: string | undefined;
  private _name: string;
  private _status: AgentStatus;

  constructor(name: string, status: AgentStatus, id?: string | undefined) {
    this._id = id;
    this._name = name;
    this._status = status;
  }
  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get status(): AgentStatus {
    return this._status;
  }
}
