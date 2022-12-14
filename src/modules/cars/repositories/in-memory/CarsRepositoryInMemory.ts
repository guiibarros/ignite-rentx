import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  public async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  public async findAvailable(
    brand: string,
    category_id: string,
    name: string
  ): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available ||
        (brand && car.brand === brand) ||
        (name && car.name === name) ||
        (category_id && car.category_id === category_id)
    );

    return cars;
  }

  public async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  public async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.find((car) => car.id === id);

    car.available = available;
  }
}

export { CarsRepositoryInMemory };
