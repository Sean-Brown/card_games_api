import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import registerUserRoutes from './controllers/user';
import registerCribbageRoutes from './controllers/cribbage';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

async function runMigrations() {
  try {
    console.log('running the database migrations');
    const connection = await createConnection();
    const migrationsRan = await connection.runMigrations();
    console.log(
      `ran ${migrationsRan.length} database migration${
        migrationsRan.length === 1 ? '' : 's'
      } successfully`
    );
  } catch (e) {
    console.error('Failed to run the database migrations', e);
  }
}

function registerRoutes() {
  registerUserRoutes(app);
  registerCribbageRoutes(app);
}

(async function init() {
  await runMigrations();

  registerRoutes();

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
