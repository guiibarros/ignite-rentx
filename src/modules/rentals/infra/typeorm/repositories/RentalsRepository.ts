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
    const rentalOpenedByCarId = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return rentalOpenedByCarId;
  }

  public async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalOpenedByUserId = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return rentalOpenedByUserId;
  }

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  public async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  public async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }
}

export { RentalsRepository };
