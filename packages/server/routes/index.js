const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const noteController = require('../controllers/noteController');
const userController = require('../controllers/userController');
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
.get(verifyRole, verifyMongooseId, noteController.getNoteById)
.patch(verifyRole, verifyMongooseId, noteController.updateNote)
.delete(verifyRole, verifyMongooseId, noteController.deleteNote);

router.route('/api/users')
.get(verifyRole, userController.getAllUsers)
.post(verifyRole, userController.createUser);

router.route('/api/users/:id')
.get(verifyRole, verifyMongooseId, userController.getUserById)
.patch(verifyRole, verifyMongooseId, userController.updateUser)
.delete(verifyRole, verifyMongooseId, userController.deleteUser);

module.exports = router;