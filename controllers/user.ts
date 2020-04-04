import express from 'express';
import { UserRepository } from '../database/repositories/user';
import { UserTokenRepository } from '../database/repositories/userToken';
import { getConnection } from 'typeorm';

const routePrefix = '/user';

export default function registerRoutes(app: express.Express) {
  app.post(`${routePrefix}/register`, async (req, res) => {
    const connection = getConnection(),
      userRepository = connection.getCustomRepository(UserRepository);
    await userRepository.register(req.body.username, req.body.password);
    res.status(201);
  });

  app.post(`${routePrefix}/login`, async (req, res) => {
    const connection = getConnection(),
      userRepository = connection.getCustomRepository(UserRepository),
      userTokenRepository = connection.getCustomRepository(UserTokenRepository),
      user = await userRepository.verify(req.body.username, req.body.password),
      token = await userTokenRepository.register(user);
    res.status(200).json({ token });
  });

  app.post(`${routePrefix}/logout`, async (req, res) => {
    const connection = getConnection(),
      userRepository = connection.getCustomRepository(UserRepository),
      user = await userRepository.findOne({ userName: req.body.username }),
      userTokenRepository = connection.getCustomRepository(UserTokenRepository),
      isValid = await userTokenRepository.validate(
        user,
        req.headers.authorization
      );
    if (!isValid) {
      res.status(401);
      return;
    }
    await userTokenRepository.unregister(user);
    res.status(204);
  });
}
