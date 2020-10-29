const usersRouter = require('express').Router();
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');
const fsPromises = require('fs').promises;

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      if (!users) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else {
        res.send(users);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: 'Не-а!' });
      }
    });
});

usersRouter.get('/users/:id', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item._id === req.params.id);
      const error = { message: 'Нет пользователя с таким id' };
      if (!user ? res.status(404).send(error) : res.status(200).send(user));
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: 'Не-а!' });
      }
    });
});

module.exports = usersRouter;