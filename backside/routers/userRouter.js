const router = require('express').Router();
const auth = require('../middlewares/auth');
const { searchUser, getUser, updateUser } = require('../controllers/userController');

// Creamaos la ruta search 
router.get('/search', auth, searchUser);
router.get('/user/:id', auth, getUser);
router.patch('/user', auth, updateUser);

module.exports = router;