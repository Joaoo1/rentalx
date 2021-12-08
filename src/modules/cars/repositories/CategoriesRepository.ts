import { Category } from '../models/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDto): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  findAll(): Category[] {
    return this.categories;
  }

  findByName(category: string): Category | undefined {
    const foundCategory = this.categories.find(c => c.name === category);
    return foundCategory;
  }
}

export { CategoriesRepository };
