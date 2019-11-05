const axios = require('axios');
const config = require('../../../config');
const {host} = config.get('deckAPI')

const createDeck = () => {
  return new Promise((resolve, reject) => {
      axios.get(`${host}/deck/new/draw/?count=9`, {}, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
          resolve(response.data);
      })
      .catch(e => {
          reject(e);
      })
  });
};

module.exports = {
  createDeck,
};
