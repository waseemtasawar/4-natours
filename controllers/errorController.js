/*global require,  process , module*/

const AppError = require('../utils/appError');

const sendErrorDev = (req, err, res) => {
  if (req.orignalUrl.startsWith('/api')) {
    // API error response
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Rendered error response
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};

const sendErrorProd = (req, err, res) => {
  // Operational, trusted error: send to client
  if (req.orignalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown error: don't leak details
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak details
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message);
};

const handleDublicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Dublicate field value: ${value}. Please used another value which is not dublicate`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.error).map((el) => el.message);
  const message = `Invalid Input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('The Token is invalid', 401);

const handleJWTExpiredError = () =>
  new AppError('The Token is expired. please login in Again', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(req, err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Handle specific error types
    let error = Object.create(err); // Better way to preserve prototype

    // Check the original error name first
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDublicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // Ensure we only send one response
    if (res.headersSent) return;
    sendErrorProd(req, error, res);
  }
};
