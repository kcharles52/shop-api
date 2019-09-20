const express = require('express');

// helper functions
const {
  validateProductID,
} = require('../../../middleware/routeMiddleware/paramValidation');

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

router.param('productID', validateProductID);

router
  .route('/:productID')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
