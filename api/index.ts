import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '../src/middlewares/errorHandler';

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'x-auth-token']
	})
);

import getRoutes from '../src/routes/get';
import postRoutes from '../src/routes/post';
import putRoutes from '../src/routes/put';
import deleteRoutes from '../src/routes/delete';

app.use(getRoutes);
app.use('/post', postRoutes);
app.use('/put', putRoutes);
app.use('/delete', deleteRoutes);

app.use(errorHandler);

export default app;
