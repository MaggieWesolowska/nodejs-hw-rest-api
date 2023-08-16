const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

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
      console.log(`App listens on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error(
      `Error while establishing connection: [${error}]`
    );
    process.exit(1);
  });
