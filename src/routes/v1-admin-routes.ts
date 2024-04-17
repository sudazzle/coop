import { Router } from 'express';
import { mockedStoreRouter } from './mocked-store-routes';
import { storeRoutes } from './store-routes';

export const v1AdminRoutes = Router();
v1AdminRoutes.use(mockedStoreRouter);
v1AdminRoutes.use(storeRoutes);
