const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');

router.post('/api/register', registerController.handleRegistration);
router.post('/api/auth', authController.handleLogin);
router.get('/api/refresh', refreshTokenController.handleRefreshToken);
router.get('/api/logout', logoutController.handleLogout);

module.exports = router;  