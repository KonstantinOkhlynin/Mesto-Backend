const routerCards = require('express').Router();
const path = require('path');
const cardsPath = path.join(__dirname, '../data/cards.json');
const fsPromises = require('fs').promises;

routerCards.get('/cards', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      const cards = JSON.parse(data);
      if (!cards) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else {
        res.send(cards);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: 'Не-а!' });
      }
    });
});

module.exports = routerCards;