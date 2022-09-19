import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: 'carro teste',
      description: 'descrição teste',
      brand: 'marca teste',
      license_plate: 'ABC-1234',
      daily_rate: 180,
      fine_amount: 60,
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification test',
      description: 'Description test',
    });

    const specifications_id = [specification.id];

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(carSpecifications).toHaveProperty('specifications');
    expect(carSpecifications.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    await expect(async () => {
      const car_id = '1234';
      const specifications_id = ['4321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
