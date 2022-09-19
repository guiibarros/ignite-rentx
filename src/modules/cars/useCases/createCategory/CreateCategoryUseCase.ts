import { inject, injectable } from 'tsyringe';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable() // Injetável
class CreateCategoryUseCase {
  public constructor(
    @inject('CategoriesRepository') // Injetar em tempo de execução a dependência
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
