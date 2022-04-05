import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findById(rentalId: string): Promise<Rental | undefined>;
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findAllByUser(userId: string): Promise<Rental[]>;
}

export { IRentalsRepository };
