import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute() {
    const categories = this.categoriesRepository.findAll();

    return categories;
  }
}

export { ListCategoriesUseCase };
