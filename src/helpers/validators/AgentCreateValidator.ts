import * as yup from 'yup';
import { Agent } from '../../application/domain/models/Agent';

export class AgentCreateYupValidator {
  static validate(agent: Agent) {
    try {
      yup
        .object()
        .shape({
          name: yup
            .string()
            .min(4, 'Nome deve ter pelo menos 4 caracteres.')
            .required('Nome é um campo obrigatório.'),
          email: yup
            .string()
            .required('E-mail é um campo obrigatório.')
            .email('E-mail com um formato inválido.'),
        })
        .validateSync(
          {
            name: agent.name,
            email: agent.email,
          },
          {
            abortEarly: false,
          },
        );
    } catch (err) {
      const error = err as yup.ValidationError;
      return { errors: error.errors };
    }
  }
}
