import { Router } from 'express';
import { getMockedStoreData } from '@/controller/mocked-store-controller';

export const mockedStoreRouter = Router();

mockedStoreRouter.get('/mocked-store', getMockedStoreData);