const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');

router.post('/api/register', registerController.handleRegistration);
router.post('/api/auth', authController.handleLogin);

module.exports = router;