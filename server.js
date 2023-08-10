const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
// const { DB_HOST, PORT = 3000 } = process.env;

const connection = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
