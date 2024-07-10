import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { InjectionKeys } from '../../../application/InjectionKeys';
import { AgentServiceInputPort } from '../../../application/ports/input/AgentServiceInputPort';
import { Messages } from '../../../application/Messages';
import { Constantes } from '../../../application/Constantes';
import { BaseError } from '../../../helpers/errors/BaseError';

@injectable()
export class AgentController {
  constructor(
    @inject(InjectionKeys.AGENT_SERVICE_INPUT_PORT)
    private readonly agentServiceInputPort: AgentServiceInputPort,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const agent = await this.agentServiceInputPort.create(request.body);

      return response
        .json({
          message: Messages.AGENT_CREATED,
          agent,
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
      await this.agentServiceInputPort.update(id, request.body);

      return response
        .json({
          message: Messages.AGENT_UPDATED,
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

      await this.agentServiceInputPort.delete(id);

      return response
        .json({
          message: Messages.AGENT_DELETED,
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

      const agent = await this.agentServiceInputPort.findOne(id);

      return response
        .json({
          agent,
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
      const { search } = request.query;
      const agents = await this.agentServiceInputPort.findAll(search as string);

      return response
        .json({
          agents: agents ?? [],
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
