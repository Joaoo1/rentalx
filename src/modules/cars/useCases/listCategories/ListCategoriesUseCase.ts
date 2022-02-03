import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/entities/Category';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  execute(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }
}

export { ListCategoriesUseCase };
