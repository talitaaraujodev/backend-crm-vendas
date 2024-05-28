export interface OutputCreateAgentDto {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
}

export interface OutputFindOneAgentDto {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
}
