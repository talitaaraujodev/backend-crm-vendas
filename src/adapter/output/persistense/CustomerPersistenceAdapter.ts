import { Repository } from 'typeorm';
import { Customer } from '../../../application/domain/models/Customer';
import { CustomerPersistenceOutputPort } from '../../../application/ports/output/CustomerPersistenceOutputPort';
import { CustomerEntity } from './entities/CustomerEntity';
import { AppDataSource } from '../../../config/database/ormConfig';
import { ObjectId } from 'mongodb';

export class CustomerPersistenceAdapter
  implements CustomerPersistenceOutputPort
{
  private readonly customerRepository: Repository<CustomerEntity> =
    AppDataSource.getRepository(CustomerEntity);

  async save(customer: Customer): Promise<Customer> {
    const customerEntitySaved: any = await this.customerRepository.save({
      _id: new ObjectId(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: {
        zipcode: customer.address.zipcode,
        street: customer.address.street,
        number: customer.address.number,
        bairro: customer.address.bairro,
        city: customer.address.city,
        complement: customer.address.complement,
      },
      status: customer.status,
      saleValue: customer.saleValue,
      agentId: customer.agentId,
    });

    return new Customer(
      customerEntitySaved.name,
      customerEntitySaved.email,
      customerEntitySaved.phone,
      customerEntitySaved.address,
      customerEntitySaved.status,
      customerEntitySaved.agentId,
      customerEntitySaved.saleValue,
      customerEntitySaved._id,
    );
  }
  async update(id: string, customer: Customer): Promise<void> {
    await this.customerRepository.update(
      { _id: new ObjectId(id) },
      {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: {
          zipcode: customer.address.zipcode,
          street: customer.address.street,
          number: customer.address.number,
          bairro: customer.address.bairro,
          city: customer.address.city,
          complement: customer.address.complement,
        },
        status: customer.status,
        saleValue: customer.saleValue,
        agentId: customer.agentId,
        updatedAt: new Date(),
      },
    );
  }
  async delete(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.customerRepository.delete({ _id: objectId });
  }
  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findAllByQuery(query: object): Promise<CustomerEntity[]> {
    return await this.customerRepository.find({ where: query });
  }
  async findById(id: string): Promise<CustomerEntity | null> {
    const objectId = new ObjectId(id);

    return await this.customerRepository.findOne({
      where: { _id: objectId },
    });
  }
  async findByEmail(email: string): Promise<CustomerEntity | null> {
    return await this.customerRepository.findOne({
      where: { email: email },
    });
  }
}
