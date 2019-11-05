const Promise = require('bluebird');
const deckService = require('../../common/services/DeckService');

module.exports.create = ({}) => {
  return new Promise(resolve => {
    deckService
      .createDeck()
      .then(rec => {
        return resolve({ code: 200, data: rec });
      })
      .catch(e => {
        return resolve({ code: 400, data: {}, message: e.message, error: e });
      });
  });
};

