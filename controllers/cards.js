const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.owner, req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Такой карточки нет!' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => res.status(400).send({ message: `Неправильный id ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Проверьте правильность данных' });
      }
      return res.status(200).send({ user });
    })
    .catch((err) => res.status(400).send({ message: `Ошибка,карточка не была создана ${err}` }));
};
