const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users');

router.get('/', authController.listUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(
  '/logout',
  authController.auth,
  authController.logout
);
router.get(
  '/current',
  authController.auth,
  authController.current
);

router.patch(
  '/:userId/subscription',
  authController.auth,
  authController.updateSub
);

module.exports = router;
