import { getMockedStoreData } from '@/controller/mocked-store-controller';
import { Router } from 'express';

export const mockedStoreRouter = Router();

mockedStoreRouter.get('/mocked-store', getMockedStoreData);
