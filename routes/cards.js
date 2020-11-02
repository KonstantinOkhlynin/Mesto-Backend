const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '../data', 'cards.json');
const usersReadFile = (filePath) => fsPromises.readFile(filePath, { encoding: 'utf8' });
router.get('/cards', (req, res) => {
  const file = usersReadFile(cardsPath);
  file
 .then((data) => {
  const cards = JSON.parse(data);
  return cards;
 })
 .then((data) => {
  res.send(data);
 })
});

module.exports = router;
