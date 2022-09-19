import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  public constructor() {
    this.repository = getRepository(Rental);
  }

  public async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rentalOpenedByCarId = await this.repository.findOne({ car_id });

    return rentalOpenedByCarId;
  }

  public async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalOpenedByUserId = await this.repository.findOne({ user_id });

    return rentalOpenedByUserId;
  }

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
