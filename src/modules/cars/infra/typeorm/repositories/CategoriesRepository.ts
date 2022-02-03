import { getRepository, Repository } from 'typeorm';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
