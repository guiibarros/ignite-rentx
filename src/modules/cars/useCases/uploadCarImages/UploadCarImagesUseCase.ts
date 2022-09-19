import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  public constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async (image_name) => {
      await this.carsImagesRepository.create({ car_id, image_name });

      await deleteFile(`./tmp/cars/${image_name}`);
    });
  }
}

export { UploadCarImagesUseCase };
