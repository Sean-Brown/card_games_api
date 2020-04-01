import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';

import registerCribbageRoutes from './controllers/cribbage';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

registerCribbageRoutes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
