import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

interface IRequest {
  userId: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  execute({ userId }: IRequest): Promise<Rental[]> {
    return this.rentalsRepository.findAllByUser(userId);
  }
}

export { ListRentalsByUserUseCase };
