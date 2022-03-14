import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpeciticationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;
    const { specificationsId } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpeciticationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    return response.json(cars);
  }
}

export { CreateCarSpecificationController };
