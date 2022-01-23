import { Category } from '../entities/Category';

interface ICreateCategoryDto {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDto): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDto };
