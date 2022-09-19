import { Category } from '../infra/typeorm/entities/Category';

/* DTO => Data Transfer Object
 *  - transferencia de dados entre camadas à partir de objetos
 */
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

// LSP - Liskov Substitution Principle
interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  create(props: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
