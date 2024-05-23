import * as yup from 'yup';
import { Customer } from '../../application/domain/models/Customer';

export class CustomerCreateYupValidator {
  static validate(customer: Customer) {
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
          phone: yup
            .string()
            .min(11, 'Telefone deve ter pelo menos 11 caracteres.')
            .max(11, 'Telefone deve ter no máximo 11 caracteres.')
            .required('Telefone é um campo obrigatório.'),
          address: yup.object().shape({
            zipcode: yup.string().required('CEP é um campo obrigatório.'),
            street: yup.string().required('Logradouro é um campo obrigatório.'),
            number: yup.string().required('Número é um campo obrigatório.'),
            bairro: yup.string().required('Bairro é um campo obrigatório.'),
            city: yup.string().required('Cidade um campo obrigatório.'),
            complement: yup
              .string()
              .required('Complemento é um campo obrigatório.'),
          }),
        })
        .validateSync(
          {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
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
