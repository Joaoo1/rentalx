/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listen on ${process.env.PORT}`);
});
