const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'email', // Change to your recipient
  from: 'maggiewes07@gmail.com', // Change to your verified sender
  subject: `Your verification email :)`,
  text: 'Please click to verify your email',
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch(error => {
    console.error(error);
  });

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require('./config/config-passport');

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'You need to use /api route!',
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

module.exports = app;
