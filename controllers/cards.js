const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).orFail(new Error('NotValidId'))
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Нельзя удалить чужую карточку' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Такой карточки нет!' });
      } if (err.name === 'CastError') {
        return res.status(400).send({ message: `Ошибка валидации id карточки ${req.params.id}` });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner }).orFail(new Error('NotValidData'))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.message === 'NotValidData') {
        return res.status(404).send({ message: 'Проверьте правильность данных' });
      }
      return res.status(400).send({ message: `Ошибка,карточка не была создана ${err.message}` });
    });
};
