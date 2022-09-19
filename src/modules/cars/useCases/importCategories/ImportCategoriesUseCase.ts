import { parse as csvParse } from 'csv-parse'; // Biblioteca que lida com arquivos csv
import fs from 'fs'; // Biblioteca node responsável por lidar com sistemas de arquivos e stream
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  public constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // Criar stream do arquivo csv
      const parseFile = csvParse(); // Inicializa o csvParse
      const categories: IImportCategory[] = [];

      stream.pipe(parseFile); // Cada pedaço lido (linha), é transferido ao csvParse

      // Quando o csvParse recebe o dado, executa uma função
      parseFile
        .on('data', async (line) => {
          // line = ['name', 'description'];
          const [name, description] = line;

          categories.push({ name, description });
        })
        // Quando terminar de ler o arquivo inteiro
        .on('end', () => {
          fs.promises.unlink(file.path); // Remover arquivo
          resolve(categories);
        })
        .on('error', (error) => reject(error));
    });
  }

  public async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name
      );

      if (categoryAlreadyExists) {
        throw new AppError('Category already exists.');
      }

      await this.categoriesRepository.create({ name, description });
    });
  }
}

export { ImportCategoriesUseCase };
