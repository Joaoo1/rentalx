import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minimumRentalHours = 24;

    const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (isCarUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user!');
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate
    );

    if (compare < minimumRentalHours) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    await this.carsRepository.updateAvailable(carId, false);

    return rental;
  }
}

export { CreateRentalUseCase };
