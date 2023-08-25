const app = require('./app');
const path = require('path');
const mongoose = require('mongoose');
const createFolderIfNotExist = require('./helpers/multer');
mongoose.Promise = global.Promise;

require('dotenv').config();

const uploadDir = path.join(process.cwd(), 'public/tmp');
const storeImage = path.join(
  process.cwd(),
  'public/avatars'
);

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  dbName: 'db-contacts',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(storeImage);
      console.log(`App listens on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error(
      `Error while establishing connection: [${error}]`
    );
    process.exit(1);
  });
