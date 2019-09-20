const express = require('express');

// helper functions
const {
  validateOrderID,
} = require('../../../middleware/routeMiddleware/paramValidation');

// Orders router
const router = express.Router();

// controllers
const {
  createOrder,
  getOrders,
  getSingleOrder,
  updatedSingleOrder,
  deleteSpecificOrder,
} = require('./orders.controller');

router
  .route('/')
  .get(getOrders)
  .post(createOrder);

router.param('orderID', validateOrderID);

router
  .route('/:orderID')
  .get(getSingleOrder)
  .patch(updatedSingleOrder)
  .delete(deleteSpecificOrder);

module.exports = router;
