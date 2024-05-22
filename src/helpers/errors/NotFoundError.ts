import { Constantes } from '../../application/Constantes';
import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string, errors: any) {
    super(Constantes.httpStatus.NOT_FOUND, message, errors);
  }
}
