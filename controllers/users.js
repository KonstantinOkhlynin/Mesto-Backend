const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'dev-secret' } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Пользователь с таким id не найдён'));
      }
      return res.status(200).send(data);
    })
    .catch((err) => next(new BadRequestError(`Неправильный id ${err.message}`)));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const pattern = new RegExp(/^[A-Za-z0-9]{8,}$/);
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!pattern.test(password)) {
    return next(new BadRequestError('Пaроль должен быть не менее 8 символов и состоять из заглавных,строчных букв и цифр без пробелов'));
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Проверьте правильность данных'));
      }
      return res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Ошибка валидации ${err.message}`));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError('Данный email уже используется'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
      );
      res.send({ token });
    })
    .catch((err) => next(new UnauthorizedError(`${err.message}`)));
};
