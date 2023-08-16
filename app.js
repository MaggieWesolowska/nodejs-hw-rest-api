const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require('./config/config-passport');

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use('/users/login', usersRouter);
app.use('/users/register', usersRouter);
app.use('/users/logout', contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Use api on routes: 
    /users/signup - registration user {username, email, password}
    /users/login - login {email, password}
    /users/current - get message if user is authenticated`,
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;
