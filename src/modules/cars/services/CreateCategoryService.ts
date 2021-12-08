import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface ICreateCategoryServiceParams {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: ICreateCategoryServiceParams) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Categoria já existe');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
