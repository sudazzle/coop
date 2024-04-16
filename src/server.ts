import 'reflect-metadata';
import 'dotenv/config';
import { app } from '@/app';
import { appDataSource } from '@/app-datastore';

const PORT = process.env.PORT || 6000;

appDataSource.initialize().then(() => {
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`api-gateway is running on http://localhost:${PORT}`);
  });

  if (module['hot']) {
    module['hot'].accept(err => {
      if (err) {
        console.error('Cannot apply HMR update.', err);
      }
    });
  }

}).catch((error: any) => console.log('Database connection failed!', error));



