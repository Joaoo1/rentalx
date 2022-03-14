import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpeciticationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpeciticationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpeciticationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should not be able to add a specification to a non existent car', async () => {
    expect(async () => {
      const carId = '1234';
      const specificationsId = ['54321'];

      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      name: 'name car',
      description: 'description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      categoryId: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'Test',
      name: 'test',
    });

    const specificationsId = [specification.id];

    const carSpecfications = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    expect(carSpecfications).toHaveProperty('specifications');
    expect(carSpecfications.specifications.length).toBe(1);
  });
});
