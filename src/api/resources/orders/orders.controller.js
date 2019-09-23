// model
const Order = require('./orders.models');

const createOrder = (req, res, next) => {
  const order = new Order({
    quantity: req.body.quantity,
    product: req.body.productID,
  });

  return order
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Order successfully created',
        order: {
          ...result._doc,
          request: {
            description: 'Get single order',
            type: 'GET',
            url: `http://${req.headers.host}/orders/${order.id}`,
          },
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Unable to create order',
      });
    });
};

const getOrders = (req, res, next) => {
  return Order.find().then((result) => {
    if (result.length >= 1)
      return res.status(200).json({
        message: 'Orders successfully fetched',
        count: result.length,
        Orders: result.map((order) => {
          return {
            ...order._doc,
            request: {
              description: 'Get single order',
              type: 'GET',
              url: `http://${req.headers.host}/orders/${order.id}`,
            },
          };
        }),
      });

    return res.status(200).json({
      message: 'You have no orders created',
    });
  });
};

const getSingleOrder = (req, res, next) => {
  return Order.findById(req.params.orderID)
    .then((order) => {
      res.status(200).json({
        message: 'Order details',
        Order: {
          ...order._doc,
          request: {
            description: 'Get all orders',
            type: 'GET',
            url: `http://${req.headers.host}/orders/${order.id}`,
          },
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Unable to fetch the order',
      });
    });
};

const updatedSingleOrder = (req, res, next) => {
  const updateParams = {};

  for (const ops of req.body) {
    updateParams[ops.propName] = ops.value;
  }

  return Order.findOneAndUpdate(
    { _id: req.params.orderID },
    { $set: updateParams }
  )
    .then((order) => {
      res.status(200).json({
        message: 'Order updated',
        order: {
          ...order._doc,
          request: {
            description: 'Get all orders',
            type: 'GET',
            url: `http://${req.headers.host}/orders`,
          },
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Un error occered please try again',
        orderId: req.params.orderID,
        request: {
          description: 'Get all orders',
          type: 'GET',
          url: `http://${req.headers.host}/orders`,
        },
      });
    });
};

const deleteSpecificOrder = (req, res, next) => {
  return Order.deleteOne({ _id: req.params.orderID })
    .then(() => {
      res.status(200).json({
        message: 'order deleted',
        orderId: req.params.orderID,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Unable to delete the order',
        orderId: req.params.orderID,
        request: {
          description: 'Creat an order',
          type: 'POST',
          url: `http://${req.headers.host}/orders`,
        },
      });
    });
};

module.exports = {
  createOrder,
  getOrders,
  getSingleOrder,
  updatedSingleOrder,
  deleteSpecificOrder,
};
