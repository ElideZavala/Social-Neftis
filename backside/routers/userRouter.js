const router = require('express').Router();
const auth = require('../middlewares/auth');

const { searchUser, getUser } = require('../controllers/userController');

// Creamaos la ruta search 
router.get('/search', auth, searchUser);
router.get('/user/:id', auth, getUser);

module.exports = router;