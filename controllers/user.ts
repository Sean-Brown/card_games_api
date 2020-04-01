import express from 'express';

const routePrefix = '/user';

export default function registerRoutes(app: express.Express) {
  app.post(`${routePrefix}/register`, (req, res) => {});
  app.post(`${routePrefix}/login`, (req, res) => {});
}
