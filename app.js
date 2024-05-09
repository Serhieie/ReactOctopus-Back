import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs/promises';
import path from 'path';

const jsonPath = './swagger.json';
const swaggerDocumentPath = path.resolve(jsonPath);

async function readSwaggerDocument() {
  const data = await fs.readFile(swaggerDocumentPath);
  const swaggerDocument = JSON.parse(data);
  return swaggerDocument;
}

import {
  authRouter,
  boardRouter,
  imagesRouter,
  needHelpRouter,
  columnRouter,
  cardRouter
} from './routes/api/index.js';

dotenv.config();

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/boards', boardRouter);
app.use('/api/columns', columnRouter);
app.use('/api/cards', cardRouter);
app.use('/api/images', imagesRouter);

app.use('/api', needHelpRouter);

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(await readSwaggerDocument())
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error ' } = err;
  res.status(status).json({ message });
});

export default app;
