import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test test',
      description: 'description',
      dailyRate: 100,
      licensePlate: 'XXX-TEST',
      fineAmount: 50,
      brand: 'brand',
      categoryId: '2aa04d01-ed5a-4663-9b6b-9b56443a7113',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test test',
      description: 'description',
      dailyRate: 100,
      licensePlate: 'XXX-TEST',
      fineAmount: 50,
      brand: 'Car_brand',
      categoryId: 'test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test name',
      description: 'description',
      dailyRate: 100,
      licensePlate: 'XXX-TEST',
      fineAmount: 50,
      brand: 'Car_brand',
      categoryId: 'test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Test name',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test name',
      description: 'description',
      dailyRate: 100,
      licensePlate: 'XXX-TEST',
      fineAmount: 50,
      brand: 'Car_brand',
      categoryId: 'test_category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: 'test_category',
    });

    expect(cars).toEqual([car]);
  });
});
