import express from 'express';
import authRouter from './controllers/auth.controller';
import subscriptionRouter from './controllers/subscription.controller';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/subscriptions', subscriptionRouter);

app.use(errorHandler);

export default app;
