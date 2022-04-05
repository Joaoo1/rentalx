import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      carId,
      expectedReturnDate,
      userId,
      startDate: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(rentalId: string): Promise<Rental | undefined> {
    return this.rentals.find(r => r.id === rentalId);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.carId === carId && !rental.endDate
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.userId === userId && !rental.endDate
    );
  }

  async findAllByUser(userId: string): Promise<Rental[]> {
    return this.rentals.filter(r => r.userId === userId);
  }
}

export { RentalsRepositoryInMemory };
