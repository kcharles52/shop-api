const mongoose = require('mongoose');

// model
const Order = require('../../api/resources/orders/orders.models');
const Product = require('../../api/resources/products/product.model');

const validateOrderID = (req, res, next) => {
  try {
    const { orderID } = req.params;

    if (!orderID) {
      return res.status(400).json({
        message: 'Order ID is required',
      });
    }
    if (mongoose.Types.ObjectId(orderID)) {
      return Order.findById(orderID).then((order) => {
        if (!order) {
          return res.status(404).json({
            message: 'Order not found',
          });
        }

        next();
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Please check the order ID',
    });
  }
};

const validateProductID = (req, res, next) => {
  try {
    const { productID } = req.params;

    if (!productID) {
      return res.status(400).json({
        message: 'product ID is required',
      });
    }
    if (mongoose.Types.ObjectId(productID)) {
      return Product.findById(productID).then((product) => {
        if (!product) {
          return res.status(404).json({
            message: 'product not found',
          });
        }

        next();
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Please check the product ID',
    });
  }
}

module.exports = {
  validateOrderID,
  validateProductID
};
