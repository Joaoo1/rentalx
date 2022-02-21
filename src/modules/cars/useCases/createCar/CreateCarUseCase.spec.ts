import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'brand',
      name: 'name car',
      description: 'description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      categoryId: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existent license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'brand',
        name: 'Car1',
        description: 'description car',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        categoryId: 'category',
      });
      await createCarUseCase.execute({
        brand: 'brand',
        name: 'Car2',
        description: 'description car',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        categoryId: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with availability true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'brand',
      name: 'Car Available',
      description: 'description car',
      dailyRate: 100,
      licensePlate: 'ABCD-1234',
      fineAmount: 60,
      categoryId: 'category',
    });

    expect(car.available).toBe(true);
  });
});
