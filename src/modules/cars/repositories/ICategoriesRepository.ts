import { Category } from '../models/Category';

interface ICreateCategoryDto {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  findAll(): Category[];
  create({ name, description }: ICreateCategoryDto): void;
}

export { ICategoriesRepository, ICreateCategoryDto };
