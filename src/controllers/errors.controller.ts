import { ErrorRequestHandler } from 'express';
import log4js from 'log4js';

const consoleLogger = log4js.getLogger('consoleLogger');
interface IErrorInfo {
  error: string;
  name: string;
  message: string;
  descripcion?: string;
  stack: string;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, name, message, error, stack, descripcion } = err;
  const errorInfo: IErrorInfo = {
    error,
    name,
    message,
    stack,
  };
  if (descripcion) {
    errorInfo.descripcion = descripcion;
  }
  consoleLogger.error(`Error: ${error}, Message: ${message}, Stack: ${stack} `);

  res.status(statusCode || 500).json(errorInfo);
};
