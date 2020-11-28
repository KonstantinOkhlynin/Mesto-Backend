const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUser);

module.exports = router;
