const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;

// mongoose.connect(process.env.DB_HOST, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });
