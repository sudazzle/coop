import 'dotenv/config';
import 'reflect-metadata';

import { app } from '@/app';
import { appDataSource } from '@/app-datastore';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

appDataSource
  .initialize()
  .then(() => {
    app.listen(Number(PORT), HOST, () => {
      console.log(`api-gateway is running on http://localhost:${PORT}`);
    });

    if (module.hot) {
      module.hot.accept((err) => {
        if (err) {
          console.error('Cannot apply HMR update.', err);
        }
      });
    }
  })
  .catch((error) => console.log('Database connection failed!', error));
