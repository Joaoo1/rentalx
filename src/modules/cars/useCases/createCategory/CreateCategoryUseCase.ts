import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface ICreateCategoryUseCaseParams {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: ICreateCategoryUseCaseParams) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Categoria já existe');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
