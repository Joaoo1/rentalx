import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private readonly importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { file } = request;

    if (file) {
      this.importCategoryUseCase.execute(file);
    }

    return response.status(201).send();
  }
}

export { ImportCategoryController };
