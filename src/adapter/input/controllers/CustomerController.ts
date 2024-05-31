import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { InjectionKeys } from '../../../application/InjectionKeys';
import { Messages } from '../../../application/Messages';
import { Constantes } from '../../../application/Constantes';
import { CustomerServiceInputPort } from '../../../application/ports/input/CustomerServiceInputPort';
import { BaseError } from '../../../helpers/errors/BaseError';

@injectable()
export class CustomerController {
  constructor(
    @inject(InjectionKeys.CUSTOMER_SERVICE_INPUT_PORT)
    private readonly customerServiceInputPort: CustomerServiceInputPort,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      await this.customerServiceInputPort.create(request.body);

      return response
        .json({
          message: Messages.CUSTOMER_CREATED,
        })
        .status(Constantes.httpStatus.CREATED);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const customer = await this.customerServiceInputPort.update(
        id,
        request.body,
      );

      return response
        .json({
          message: Messages.CUSTOMER_UPDATED,
          customer,
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;

      await this.customerServiceInputPort.delete(id);

      return response
        .json({
          message: Messages.CUSTOMER_DELETED,
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;

      const customer = await this.customerServiceInputPort.findOne(id);

      return response
        .json({
          customer,
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const customers = await this.customerServiceInputPort.findAll();

      return response
        .json({
          customers: customers ?? [],
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async generateReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { startDate, endDate, agentId, status }: any = request.query;

      const customers = await this.customerServiceInputPort.generateReport(
        startDate,
        endDate,
        status,
        agentId,
      );
      return response
        .json({
          customers,
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }
}
