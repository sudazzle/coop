import { appDataSource } from '@/app-datastore';
import { Store, StoreWithoutId } from '@/entity/store';
import { BadRequestError } from '@/error-types';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Equal } from 'typeorm';

export const getAllStores = async (req: Request, res: Response) => {
  const hasPagination = Boolean(req.query.page && req.query.itemsPerPage);
  const page = Number.parseInt(req.query.page as string) || 1;
  const itemsPerPage = Number.parseInt(req.query.itemsPerPage as string) || 10;
  const skip = (page - 1) * itemsPerPage;

  const storeRepository = appDataSource.getRepository(Store);
  const [result, total] = await storeRepository.findAndCount({
    skip: hasPagination ? skip : undefined,
    take: hasPagination ? itemsPerPage : undefined,
  });

  res.status(StatusCodes.OK).json({
    stores: result,
    total,
  });
};

export const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const storeRepository = appDataSource.getRepository(Store);
    const store = await storeRepository.findOneOrFail({
      where: { id: Equal(id) },
    });

    res.status(StatusCodes.OK).json(store);
  } catch (error) {
    next(error);
  }
};

export const createStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeData = plainToClass(StoreWithoutId, req.body, { excludeExtraneousValues: true });
    const errors = await validate(storeData);

    if (errors.length > 0) {
      throw new BadRequestError(errors);
    }

    await appDataSource.transaction(async (transactionEntityManager) => {
      const storeRepository = transactionEntityManager.getRepository(Store);
      const store = storeRepository.create(storeData);
      await storeRepository.save(store);
      res.status(StatusCodes.OK).json(store);
    });
  } catch (error) {
    next(error);
  }
};

export const patchStore = async (req: Request, res: Response, next: NextFunction) => {
  const storeData = plainToClass(StoreWithoutId, req.body, { excludeExtraneousValues: true });
  const errors = await validate(storeData, { skipMissingProperties: true });

  try {
    if (errors.length > 0) {
      throw new BadRequestError(errors);
    }

    await appDataSource.transaction(async (transactionEntityManager) => {
      const id = req.params.id;
      const storeRepository = transactionEntityManager.getRepository(Store);
      const store = await storeRepository.findOneOrFail({
        where: { id: Equal(id) },
      });
      const patchedStore = await storeRepository.save({ ...store, ...req.body });
      res.status(StatusCodes.OK).json(patchedStore);
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const storeRepository = appDataSource.getRepository(Store);
    const store = await storeRepository.findOneOrFail({
      where: { id: Equal(id) },
    });
    await storeRepository.remove(store);
    res.status(StatusCodes.OK).json({ message: 'Store deleted successfully' });
  } catch (error) {
    next(error);
  }
};
