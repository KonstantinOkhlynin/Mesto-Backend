/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */

const User = require('../models/user');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Пользователь с таким id не найдён' });
        return;
      }
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};
