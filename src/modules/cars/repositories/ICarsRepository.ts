import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car | undefined>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<Car>;
}

export { ICarsRepository };
