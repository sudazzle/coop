import { BadRequestError } from '@/error-types';
import { v1AdminRoutes } from '@/routes/v1-admin-routes';
import { v1routes } from '@/routes/v1-routes';
import cors from 'cors';
import express, { type Request, type Response, type Errback, type NextFunction } from 'express';
import { UnauthorizedError, auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { EntityNotFoundError } from 'typeorm';

const logger = pino();
const expressLogger = pinoHttp({ logger });

export const app = express();
app.use(expressLogger);

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || 'https://coop-admin.sudaman-shrestha.com',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE || 'https://coop-api-gateway',
  issuerBaseURL: process.env.AUTHO_ISSUER_BASE_URL || 'https://dev-ju0zj0ic.us.auth0.com/',
});

app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

app.use('/api/v1', v1routes);
app.use('/api/v1/admin', checkJwt, requiredScopes('read:stores write:stores'), v1AdminRoutes);

app.use((err: Errback, req: Request, res: Response, _: NextFunction): void => {
  if (err instanceof UnauthorizedError) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  } else if (err instanceof EntityNotFoundError) {
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
