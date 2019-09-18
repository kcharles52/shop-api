// Third party libraries
const express = require('express');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');

// modules
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

// create express app
const app = express();

// app middleware
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Types, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes for handling requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// for error handling
app.use((req, res, next) => {
  const error = new Error('Not found');

  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
