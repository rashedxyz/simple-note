const router = require('express').Router();
const registerController = require('../controllers/registerController');

router.post('/api/register', registerController);

module.exports = router;