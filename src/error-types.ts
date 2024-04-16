import type { ValidationError } from 'class-validator';

export class BadRequestError extends Error {
  validationErrors: ValidationError[];

  constructor(validationErrors: ValidationError[]) {
    super();
    this.validationErrors = validationErrors;
    this.name = 'BadRequestError';
    Error.captureStackTrace(this, this.constructor);
  }
}
