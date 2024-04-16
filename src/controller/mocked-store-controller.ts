import { Request, Response } from 'express';
import axios from 'axios';
import jsonData from './mock.json';

export const getMockedStoreData = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://minside.coop.no/StoreService/SearchStores');
    res.send(response.data);
  } catch (error) {
    res.send(jsonData);
  }
}
