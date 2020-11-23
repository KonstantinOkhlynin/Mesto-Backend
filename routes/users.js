const router = require('express').Router();
const {
  getUsers, getUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getUser);

module.exports = router;
