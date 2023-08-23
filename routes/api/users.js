const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users');
const auth = require('../../middleware/validateAuth');

router.get('/', authController.listUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', auth, authController.logout);
router.get('/current', auth, authController.current);

router.patch(
  '/:userId/subscription',
  auth,
  authController.updateSub
);

module.exports = router;
