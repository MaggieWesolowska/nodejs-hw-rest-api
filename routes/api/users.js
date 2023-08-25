const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users');
const auth = require('../../middleware/validateAuth');
const validateUpload = require('../../middleware/validateUpload');
const uploadAvatar = require('../../controllers/multer');

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

router.patch(
  '/avatars',
  auth,
  validateUpload,
  uploadAvatar
);

module.exports = router;
