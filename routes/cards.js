const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '../data', 'cards.json');

router.get('/cards', (req, res) => {
  const file = fs.createReadStream(cardsPath);
  file.on('error', () => {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.status(500).send({ message: 'Что то пошло не так' });
  });
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  file.pipe(res);
});

module.exports = router;
