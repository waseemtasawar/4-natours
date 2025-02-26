/*global require, __dirname, module, process*/
const express = require('express');
const app = express();
app.use(express.json());
const morgin = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgin('dev'));
}

app.use(express.static(`${__dirname}/public`));

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
// MiddleWares

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

const indexPage = (req, res) => {
  res.status(200).json({ message: 'Hello from server', app: 'Natours' });
};
// Route Handles

app.get('/', indexPage);
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours',addTour)
// app.get('/api/v1/tours/:id',getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// routs

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
//Srever:
module.exports = app;
