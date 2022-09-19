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
      name: 'Car test 1',
      description: 'Description test 1',
      daily_rate: 180.0,
      license_plate: 'ABC-1234',
      fine_amount: 90.0,
      brand: 'Brand test 1',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 2',
      description: 'Description test 2',
      daily_rate: 140.0,
      license_plate: 'CBA-5432',
      fine_amount: 40.0,
      brand: 'Brand test 2',
      category_id: '28492',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 3',
      description: 'Description test 3',
      daily_rate: 120.0,
      license_plate: 'YBA-49201',
      fine_amount: 20.0,
      brand: 'Brand test 3',
      category_id: '34092',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 3',
      description: 'Description test 3',
      daily_rate: 190.0,
      license_plate: 'ALC-29402',
      fine_amount: 70.0,
      brand: 'Brand test 3',
      category_id: '10583',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
