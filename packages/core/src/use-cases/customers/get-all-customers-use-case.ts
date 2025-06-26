import type { ICustomersRepository } from '../../interfaces/repositories'

export class GetAllCustomersUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute() {
    const customers = await this.customersRepository.findAll()
    return customers.map((customer) => customer.dto)
  }
}
