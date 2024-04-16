import { BadRequestError } from '@/error-types';
import { v1routes } from '@/routes/v1';
import express, { type Request, type Response, type Errback, type NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { EntityNotFoundError } from 'typeorm';

export const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

app.use('/api/v1', v1routes);

app.use((err: Errback, _req: Request, res: Response, _: NextFunction): void => {
  if (err instanceof EntityNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Entity not found' });
  } else if (err instanceof BadRequestError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: ReasonPhrases.BAD_REQUEST, errors: err.validationErrors });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
});
