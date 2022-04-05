/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

interface IRequest {
  id: string;
  // userId: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental doesn't exists");
    }

    const car = await this.carsRepository.findById(rental?.carId);

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expectedReturnDate
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car!.fineAmount;
      total = calculateFine;
    }

    total += daily * car!.dailyRate;

    rental.endDate = dateNow;
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car!.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
