import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

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
      throw new AppError('Category already exists', 409);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
