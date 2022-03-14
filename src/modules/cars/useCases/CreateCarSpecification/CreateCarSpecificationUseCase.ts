import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpeciticationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError('Car not exists');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpeciticationUseCase };
