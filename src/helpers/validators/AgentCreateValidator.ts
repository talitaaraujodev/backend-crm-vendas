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
        })
        .validateSync(
          {
            name: agent.name,
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
