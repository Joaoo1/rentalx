import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  findById(rentalId: string): Promise<Rental | undefined> {
    return this.repository.findOne(rentalId);
  }

  findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.repository.findOne({
      where: {
        carId,
        endDate: null,
      },
    });
  }

  findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.repository.findOne({
      where: {
        userId,
        endDate: null,
      },
    });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  findAllByUser(userId: string): Promise<Rental[]> {
    return this.repository.find({
      where: { userId },
      relations: ['car'],
    });
  }
}

export { RentalsRepository };
