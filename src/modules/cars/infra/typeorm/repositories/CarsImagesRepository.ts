import { getRepository, Repository } from 'typeorm';

import {
  ICarsImagesRepository,
  ICreateCarImageDTO,
} from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  public constructor() {
    this.repository = getRepository(CarImage);
  }

  public async create({
    image_name,
    car_id,
  }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ image_name, car_id });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
