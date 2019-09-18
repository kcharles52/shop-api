const mongoose = require('mongoose');

const url =
  process.env.MONGODB_URL ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/shop-api';

const connectDB = () => {
  mongoose.connect(url);
  mongoose.connection.once('open', () => {
    console.log('connected to database at ' + url);
  });
};

module.exports = connectDB;
