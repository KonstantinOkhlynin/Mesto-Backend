const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(404).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Пользователь с таким id не найдён' });
      }
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send({ message: `Неправильный id ${err}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Проверьте правильность данных' });
      }
      res.status(200).send({ user });
    })
    .catch((err) => res.status(400).send({ message: `Ошибка,пользователь не создан ${err}` }));
};
