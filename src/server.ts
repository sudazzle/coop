import express, { Request, Response,  } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { v1routes } from './routes/v1';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use('/api/v1', v1routes);

app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

app.listen(PORT, () => {
  console.log(`api-gateway is running on http://localhost:${PORT}`);
});


if (module['hot']) {
  module['hot'].accept(err => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}

