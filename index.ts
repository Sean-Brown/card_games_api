import express from 'express';
import bodyParser from 'body-parser';
import { Cribbage, CribbageStrings } from 'card_games/implementations/cribbage';
import { Players } from 'card_games/base_classes/card_game';
import { CribbagePlayer } from 'card_games/implementations/cribbage_player';
import { CribbageHand } from 'card_games/implementations/cribbage_hand';
import { parseCards } from 'lib';
import { ItemCollection } from 'card_games/base_classes/collections/item_collection';

const app = express();
const port = 3000;
const cribbage = new Cribbage(new Players([]));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post('/join', (req, res) => {
  try {
    cribbage.addPlayer(new CribbagePlayer(req.body.name, new CribbageHand([])));
    res.status(204);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.post('/begin', (req, res) => {
  try {
    cribbage.begin();
    res.status(200).json({
      message: `${CribbageStrings.MessageStrings.FMT_START_GAME} ${cribbage.dealer.name}`,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.get('/hand', (req, res) => {
  try {
    const hand = cribbage.getPlayerHand(req.query.player);
    res.status(200).json({ hand: hand.items.map(card => card.shortString()) });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.post('/throw', (req, res) => {
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

app.post('/playCard', (req, res) => {
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

app.post('/go', (req, res) => {
  try {
    const result = cribbage.go(req.body.player);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.get('/describe', (req, res) => {
  try {
    const description = cribbage.describe();
    res.status(200).json({ description });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
