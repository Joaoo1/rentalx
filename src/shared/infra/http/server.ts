/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import '@shared/infra/typeorm';
import '@shared/container';

import 'express-async-errors';

import swaggerFile from '@config/swagger.json';
import { expectionHandler } from './middlewares/exceptionHandler';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(expectionHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server listen on ${process.env.PORT}`);
});
