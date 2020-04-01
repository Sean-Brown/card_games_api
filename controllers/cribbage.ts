import express from 'express';
import {
  Cribbage,
  CribbageStrings,
} from '../card_games/implementations/cribbage';
import { Players } from '../card_games/base_classes/card_game';
import { CribbagePlayer } from '../card_games/implementations/cribbage_player';
import { CribbageHand } from '../card_games/implementations/cribbage_hand';
import { ItemCollection } from '../card_games/base_classes/collections/item_collection';
import { parseCards } from '../lib';

const cribbage = new Cribbage(new Players([]));
const routePrefix = '/cribbage';

export default function registerRoutes(app: express.Express) {
  app.post(`${routePrefix}/join`, (req, res) => {
    try {
      cribbage.addPlayer(
        new CribbagePlayer(req.body.name, new CribbageHand([]))
      );
      res.status(204);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

  app.post(`${routePrefix}/begin`, (req, res) => {
    try {
      cribbage.begin();
      res.status(200).json({
        message: `${CribbageStrings.MessageStrings.FMT_START_GAME} ${cribbage.dealer.name}`,
      });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

  app.get(`${routePrefix}/hand`, (req, res) => {
    try {
      const hand = cribbage.getPlayerHand(req.body.player);
      res
        .status(200)
        .json({ hand: hand.items.map(card => card.shortString()) });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

  app.post(`${routePrefix}/throw`, (req, res) => {
    try {
      const result = cribbage.giveToKitty(
        req.body.player,
        new ItemCollection(parseCards(req.body.cards))
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

  app.post(`${routePrefix}/playCard`, (req, res) => {
    try {
      const cards = parseCards(req.body.card);
      if (cards.length === 0) {
        throw CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX;
      } else if (cards.length > 1) {
        throw CribbageStrings.ErrorStrings.TOO_MANY_CARDS;
      }
      const result = cribbage.playCard(req.body.player, cards[0]);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

  app.post(`${routePrefix}/go`, (req, res) => {
    try {
      const result = cribbage.go(req.body.player);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

  app.get(`${routePrefix}/describe`, (req, res) => {
    try {
      const description = cribbage.describe();
      res.status(200).json({ description });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });
}
