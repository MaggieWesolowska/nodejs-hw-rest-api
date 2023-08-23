const express = require('express');
const router = express.Router();
const upload = require('../../config/config-multer.js');
const uploadAvatar = require('../../controllers/multer');

router.post(
  '/upload',
  (upload.single('picture'), uploadAvatar)
);

module.exports = router;
