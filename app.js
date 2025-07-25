/*global require, __dirname, module, process*/
const express = require('express');
const app = express();
const morgin = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const swaggerDocs = require('./swagger');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// GLOBAL MIDDLEWARE

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// set Security HTTP headers

// Allow Mapbox scripts and styles
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", 'https://api.mapbox.com'],
      'connect-src': [
        "'self'",
        'https://api.mapbox.com',
        'https://events.mapbox.com',
      ],
      'style-src': ["'self'", 'https://api.mapbox.com', "'unsafe-inline'"], // Mapbox requires inline styles
      'worker-src': ['blob:'], // Required for Mapbox GL JS
      'img-src': ["'self'", 'data:', 'blob:', 'https://*.mapbox.com'], // Allow Mapbox map tiles
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
    },
  }),
);
// Developmemt logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgin('dev'));
}

// Limit request form same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests form this IP. please try again in an hour!',
});

app.use('/api', limiter);

//body parser, reading data from req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injections
app.use(mongoSanitize());

// data saritization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'maxGroupSize',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
    ],
  }),
);

// MiddleWares

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

swaggerDocs(app);

// Route Handles

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours',addTour)
// app.get('/api/v1/tours/:id',getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
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
