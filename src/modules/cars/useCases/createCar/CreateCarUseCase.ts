import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  public constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  public async execute(data: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists.');
    }

    const car = await this.carsRepository.create(data);
    return car;
  }
}

export { CreateCarUseCase };
