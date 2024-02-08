const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');

router.post('/api/register', registerController.handleRegistration);
router.post('/api/auth', authController.handleLogin);
router.get('/api/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;