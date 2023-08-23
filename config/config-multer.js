const multer = require('multer');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    getFilenameWithSuffix(file.originalname, cb);
  },
  limits: {
    fileSize: 1048576,
  },
});

const getFilenameWithSuffix = (originalname, callback) => {
  const uniqueSuffix =
    Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, uniqueSuffix + '-' + originalname);
};

const upload = multer({
  storage,
});

module.exports = upload;
