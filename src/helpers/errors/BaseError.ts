export class BaseError {
  public readonly code: number;
  public readonly message: string;
  public readonly errors?: any;

  constructor(code: number, message: string, errors?: any) {
    this.code = code;
    this.message = message;
    this.errors = errors;
  }
}
