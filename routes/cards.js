const router = require('express').Router();
const { getCards, deleteCard, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.post('/cards', auth, createCard);
router.delete('/cards/:id', auth, deleteCard);

module.exports = router;
