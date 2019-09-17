const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handle GET requests to /products',
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handle POST requests to /products',
  });
});

router.get('/:productID', (req, res, next) => {
  const { productID } = req.params;

  if (productID) {
    res.status(200).json({
      message: 'Handle GET requests to /products/:productID',
    });
  }
});

router.patch('/:productID', (req, res, next) => {
  res.status(200).json({
    message: 'Handle patch requests to /products/:productID',
  });
});

router.delete('/:productID', (req, res, next) => {
  res.status(200).json({
    message: 'Handle DELETE requests to /products/:productID',
  });
});

module.exports = router;
