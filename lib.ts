import { CribbageStrings } from './card_games/implementations/cribbage';
import { Value, Suit } from './card_games/base_classes/items/card';
import { BaseCard as Card } from './card_games/base_classes/items/card';

function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}

/**
 * Parse the cards out of the request
 * @param text the space-delimitted representation of the cards, e.g. "4c 5d jh as"
 * @returns {BaseCard} the parsed card
 * @throws CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX if parsing fails
 */
export function parseCards(text: string): Array<Card> {
  if (!text) {
    throw CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX;
  }
  // Strip out all the spaces
  text = removeSpaces(text);
  const textLen = text.length;
  if (textLen === 0 || textLen === 1) {
    throw CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX;
  }
  const cards = [];
  let ix = 0;
  while (ix < textLen) {
    const charValue = text.charAt(ix).toLowerCase();
    let charSuit = text.charAt(ix + 1).toLowerCase();
    let value: Value, suit: Suit;
    switch (charValue) {
      case 'a':
        value = Value.Ace;
        break;
      case '2':
        value = Value.Two;
        break;
      case '3':
        value = Value.Three;
        break;
      case '4':
        value = Value.Four;
        break;
      case '5':
        value = Value.Five;
        break;
      case '6':
        value = Value.Six;
        break;
      case '7':
        value = Value.Seven;
        break;
      case '8':
        value = Value.Eight;
        break;
      case '9':
        value = Value.Nine;
        break;
      // allow for the player to enter '10' or 't' for a ten
      case 't':
        value = Value.Ten;
        break;
      case '1':
        if (charSuit !== '0') {
          throw CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX;
        } else {
          value = Value.Ten;
        }
        // set the suit character to the next character
        if (ix + 2 < textLen) {
          charSuit = text.charAt(ix + 2).toLowerCase();
          ix++;
        }
        break;
      case 'j':
        value = Value.Jack;
        break;
      case 'q':
        value = Value.Queen;
        break;
      case 'k':
        value = Value.King;
        break;
      default:
        throw CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX;
    }
    switch (charSuit) {
      case 'h':
        suit = Suit.Hearts;
        break;
      case 's':
        suit = Suit.Spades;
        break;
      case 'd':
        suit = Suit.Diamonds;
        break;
      case 'c':
        suit = Suit.Clubs;
        break;
      default:
        throw CribbageStrings.ErrorStrings.INVALID_CARD_SYNTAX;
    }
    cards.push(new Card(suit, value));
    ix += 2;
  }
  return cards;
}
