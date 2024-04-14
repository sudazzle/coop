import express, { Request, Response } from 'express';
export const v1routes = express.Router();

v1routes.get('/stores', (req: Request, res: Response) => {
  res.send([
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
    {
      id: 1,
      name: 'Store 1',
    },
    {
      id: 2,
      name: 'Store 2',
    },
  ]);
});
