import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import log4js from 'log4js';
import { responseRepository } from '../repositories/response.repository';

const consoleLogger = log4js.getLogger('consoleLogger');
const errorLogger = log4js.getLogger('errorLogger');
export const errorLog: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (!error.isBoom) {
    consoleLogger.error(error);
    errorLogger.error(error);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    HttpStatusCode: 500,
    errors: [
      {
        code: 500,
        message: 'Internal server error',
      },
    ],
  });
};

export const boomErrorHandler: ErrorRequestHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.isBoom) {
    const { output, data } = error;
    const dbErr = await responseRepository.getByResIds(data.code);
    return res.status(output.statusCode).json({
      HttpStatusCode: output.statusCode,
      errors: [
        {
          code: dbErr[0]?.resId ?? output.payload.statusCode,
          message: dbErr[0]?.resDesc ?? output.payload.message,
        },
      ],
    });
  } else {
    next(error);
  }
};
