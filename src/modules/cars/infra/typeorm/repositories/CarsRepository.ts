import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  findById(id: string): Promise<Car | undefined> {
    return this.repository.findOne(id);
  }

  create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    return this.repository.save(car);
  }

  findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate });
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (categoryId) {
      carsQuery.andWhere('c.categoryId = :categoryId', { categoryId });
    }

    return carsQuery.getMany();
  }

  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = await this.repository.findOne(id);

    return this.repository.save({
      ...car,
      available,
    });
  }
}

export { CarsRepository };
