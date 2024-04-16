import { Router } from 'express';
import { mockedStoreRouter } from './mocked-store-routes';
import { storeRoutes } from './store-routes';

export const v1routes = Router();
v1routes.use(mockedStoreRouter);
v1routes.use(storeRoutes);

