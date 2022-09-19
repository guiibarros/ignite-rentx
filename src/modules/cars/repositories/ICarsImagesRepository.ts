import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICreateCarImageDTO {
  image_name: string;
  car_id: string;
}

interface ICarsImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository, ICreateCarImageDTO };
