/*global require,  process, */
const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');
dotenv.config({ path: './.env' });
// uncatch Exceprion Error handling
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shuting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
0;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connected Successfully');
  })
  .catch((error) => {
    console.log('DB is not Connected', error);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is listen on Port ${port} ..`);
});
// unhandle Rgections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! Shuting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
