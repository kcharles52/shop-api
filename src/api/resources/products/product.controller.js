const mongoose = require('mongoose');

// models
const Product = require('./product.model');

const getAllProducts = (req, res, next) => {
  return Product.find()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to fetch products',
        error: err,
      });
    });
};

const createProduct = (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product({
    name,
    price,
  });

  product
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'Product successfully save',
        product: result,
      });
    })
    .catch((err) => console.log(err));
};

const getSingleProduct = (req, res, next) => {
  const { productID } = req.params;

  if (mongoose.Types.ObjectId(productID)) {
    return Product.findById(productID)
      .then((doc) => {
        if (doc) {
          res.status(200).json({
            message: 'Product fetched',
            product: doc,
          });
        } else {
          res.status(404).json({
            message: 'No entry found',
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

const updateProduct = (req, res, next) => {
  const { productID } = req.params;

  if (mongoose.Types.ObjectId(productID)) {
    const updateParams = {};

    for (const ops of req.body) {
      console.log(ops);
      updateParams[ops.propName] = ops.value;
    }

    return Product.update({ _id: productID }, { $set: updateParams })
      .then((doc) => {
        res.status(200).json({ message: 'product successfully updated' });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

const deleteProduct = (req, res, next) => {
  const { productID } = req.params;

  if (mongoose.Types.ObjectId(productID)) {
    return Product.remove({ _id: productID })
      .then((doc) => {
        res.status(200).json({ message: 'product successfully deleted' });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
