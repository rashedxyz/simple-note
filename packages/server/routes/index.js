const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const noteController = require('../controllers/noteController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');
const verifyMongooseId = require('../middleware/verifyMongooseId');

router.post('/api/register', registerController.handleRegistration);
router.post('/api/auth', authController.handleLogin);
router.get('/api/refresh', refreshTokenController.handleRefreshToken);
router.get('/api/logout', logoutController.handleLogout);

router.use(verifyJWT);
router.route('/api/notes')
.get(verifyRole, noteController.getAllNotes)
.post(verifyRole, noteController.createNote);

router.route('/api/notes/:id')
.get(verifyMongooseId, noteController.getNoteById)
.patch(verifyMongooseId, noteController.updateNote)
.delete(verifyMongooseId, noteController.deleteNote);

module.exports = router;  