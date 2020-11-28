const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../errors/UrlValidator');
const { getCards, deleteCard, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((link) => urlValidator(link)),
  }).unknown(true),
}), createCard);
router.delete('/cards/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);

module.exports = router;
