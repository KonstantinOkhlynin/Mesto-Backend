const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data', 'users.json');

const usersReadFile = (filePath) => fs.createReadStream(filePath, { encoding: 'utf8' });

router.get('/users', (req, res) => {
  const file = usersReadFile(usersPath);
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  file.on('error', () => {
    res.status(500).send({ message: 'Что то пошло не так' });
  });
  file.on('open', () => file.pipe(res));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const users = usersReadFile(usersPath);

  res.set({ 'content-type': 'application/json; charset=utf-8' });
  let usersList = [];
  users.on('error', () => {
    res.status(500).send({ message: 'Что то пошло не так' });
  });

  users.on('data', (data) => {
    usersList += data;
  });

  users.on('end', () => {
    // eslint-disable-next-line no-underscore-dangle
    const user = JSON.parse(usersList).find((person) => person._id === id);
    if (!user) {
      res.status(404).send({ message: 'Пользователь с таким id не найдён' });
      return;
    }
    res.send(user);
  });
});
module.exports = router;
