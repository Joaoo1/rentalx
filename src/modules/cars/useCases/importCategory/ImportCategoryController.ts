import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (file) {
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
      await importCategoryUseCase.execute(file);
    }

    return response.status(201).send();
  }
}

export { ImportCategoryController };
