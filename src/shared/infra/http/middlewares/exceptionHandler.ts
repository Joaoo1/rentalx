import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

export async function expectionHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    message: `Internal server error - ${error.message}`,
    status: 'error',
  });
}
