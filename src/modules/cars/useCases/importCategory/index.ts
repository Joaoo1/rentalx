import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const specificationsRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(
  specificationsRepository
);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
