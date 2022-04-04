import 'reflect-metadata';
import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe('CreateRentalUseCase', () => {
  const tomorrow = dayjs(new Date()).add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '',
      carId: '',
      expectedReturnDate: tomorrow,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another in progress', async () => {
    expect.assertions(1);

    await createRentalUseCase.execute({
      userId: '12345',
      carId: 'AA',
      expectedReturnDate: tomorrow,
    });

    try {
      await createRentalUseCase.execute({
        userId: '12345',
        carId: 'BB',
        expectedReturnDate: tomorrow,
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should not be able to create a new rental if there the is car is already rented', async () => {
    expect.assertions(1);

    await createRentalUseCase.execute({
      userId: '12345',
      carId: 'AAA',
      expectedReturnDate: tomorrow,
    });

    try {
      await createRentalUseCase.execute({
        userId: '11111',
        carId: 'AAA',
        expectedReturnDate: tomorrow,
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect.assertions(1);

    try {
      await createRentalUseCase.execute({
        userId: '11111',
        carId: 'AAA',
        expectedReturnDate: dayjs().toDate(),
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
