import { Router } from 'express';
import { getAllStores, getStoreById, createStore, patchStore, deleteStore } from '@/controller/store-controller';
import { get } from 'http';

export const storeRoutes = Router();

storeRoutes.get('/stores', getAllStores);
storeRoutes.get('/stores/:id', getStoreById);
storeRoutes.post('/stores', createStore);
storeRoutes.patch('/stores/:id', patchStore);
storeRoutes.delete('/stores/:id', deleteStore);