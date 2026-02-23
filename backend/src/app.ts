import express, { Request, Response } from 'express';
import cors from 'cors';
import authRouter from './auth';
import profilesRouter from './profiles';
import workersRouter from './workers';
import reviewsRouter from './reviews';
import categoriesRouter from './categories';
import requestsRouter from './requests';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/profiles', profilesRouter);
app.use('/workers', workersRouter);
app.use('/reviews', reviewsRouter);
app.use('/categories', categoriesRouter);
app.use('/requests', requestsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;