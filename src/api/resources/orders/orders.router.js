const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders returned',
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Ordercreated',
  });
});

router.get('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    orderId: req.params.orderID
  });
  
});

router.patch('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Order updated',
    orderId: req.params.orderID
  });
});

router.delete('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'order deleted',
    orderId: req.params.orderID
  });
});

module.exports = router;
