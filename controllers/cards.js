/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */

const Card = require('../models/card');


module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Такой карточки нет!' });
        return;
      }
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};
