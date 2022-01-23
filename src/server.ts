/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import swaggerFile from './config/swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listen on ${process.env.PORT}`);
});
