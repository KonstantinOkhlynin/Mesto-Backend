const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Пользователь с таким id не найдён' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: `Неправильный id ${err.message}` });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })).orFail(new Error('NotValidData'))
    .then((user) => {
      res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.message === 'NotValidData') {
        return res.status(404).send({ message: 'Проверьте правильность данных' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка валидации ${err.message}` });
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({ message: 'Данный email уже используется' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
