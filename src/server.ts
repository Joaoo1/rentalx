/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(process.env.PORT, () => {
  console.log(`Server listen on ${process.env.PORT}`);
});
