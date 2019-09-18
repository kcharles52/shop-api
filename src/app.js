// Third party libraries
const express = require('express');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');

// custom middleware
const enableCors = require('./middleware/corsMiddleware');
const connectToDb = require('./utils/connectDB');

// routes
const productRoutes = require('./api/resources/products/product.router');
const orderRoutes = require('./api/resources/orders/orders.router');

// connect to the database
connectToDb();

// create express app
const app = express();

// app middleware
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(enableCors);

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
