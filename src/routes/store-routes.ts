import { get } from 'node:http';
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  patchStore,
} from '@/controller/store-controller';
import { Router } from 'express';

export const storeRoutes = Router();

storeRoutes.get('/stores', getAllStores);
storeRoutes.get('/stores/:id', getStoreById);
storeRoutes.post('/stores', createStore);
storeRoutes.patch('/stores/:id', patchStore);
storeRoutes.delete('/stores/:id', deleteStore);
