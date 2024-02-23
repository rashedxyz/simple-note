const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const noteController = require('../controllers/noteController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');

router.post('/api/register', registerController.handleRegistration);
router.post('/api/auth', authController.handleLogin);
router.get('/api/refresh', refreshTokenController.handleRefreshToken);
router.get('/api/logout', logoutController.handleLogout);

router.use(verifyJWT);
router.route('/api/notes')
.get(verifyRole, noteController.getAllNotes)
.post(noteController.createNote);

router.route('/api/notes/:id')
.get(noteController.getNoteById)
.put(noteController.updateNote)
.delete(noteController.deleteNote);

module.exports = router;  