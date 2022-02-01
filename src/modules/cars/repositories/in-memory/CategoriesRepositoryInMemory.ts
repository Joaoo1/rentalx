import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private catetories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    return this.catetories.find(category => category.name === name);
  }

  async findAll(): Promise<Category[]> {
    throw this.catetories;
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.catetories.push(category);
  }
}

export { CategoriesRepositoryInMemory };