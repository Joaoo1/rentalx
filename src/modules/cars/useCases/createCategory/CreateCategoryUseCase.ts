import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface ICreateCategoryUseCaseParams {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    description,
  }: ICreateCategoryUseCaseParams): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error('Categoria já existe');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
