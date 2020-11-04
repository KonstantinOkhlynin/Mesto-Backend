const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Такой карточки нет!' });
      }
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send({ message: `Неправильный id ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Проверьте правильность данных' });
      }
      res.status(200).send({ user });
    })
    .catch((err) => res.status(400).send({ message: `Ошибка,карточка не была создана ${err}` }));
};
