const upload = require('../config/config-multer');

const validateUpload = upload.single('picture');

module.exports = validateUpload;
