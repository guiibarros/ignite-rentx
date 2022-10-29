import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'carro teste',
      description: 'descrição teste',
      brand: 'marca teste',
      license_plate: 'ABC-1234',
      daily_rate: 180,
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existent license plate', async () => {
    await createCarUseCase.execute({
      name: 'carro 1',
      description: 'descrição 1',
      brand: 'marca 1',
      license_plate: 'ABC-1234',
      daily_rate: 180,
      fine_amount: 60,
      category_id: 'category 1',
    });

    await expect(
      createCarUseCase.execute({
        name: 'carro 2',
        description: 'descrição 2',
        brand: 'marca 2',
        license_plate: 'ABC-1234',
        daily_rate: 90,
        fine_amount: 30,
        category_id: 'category 2',
      })
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  it('should be able to create a car with availability by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'carro available',
      description: 'descrição teste',
      brand: 'marca teste',
      license_plate: 'ABC-1234',
      daily_rate: 90,
      fine_amount: 30,
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
