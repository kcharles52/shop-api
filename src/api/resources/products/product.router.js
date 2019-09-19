const express = require('express');

// controllers
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('./product.controller');

// products router
const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(createProduct);

router
  .route('/:productID')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
