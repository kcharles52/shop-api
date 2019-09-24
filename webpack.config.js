const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  target:'node',
  mode: 'development',
  resolve: {
    extensions: ['.js'],
    alias: {
      orders: path.resolve(__dirname, 'src/api/resources/orders'),
      products: path.resolve(__dirname, 'src/api/resources/products'),
      user: path.resolve(__dirname, 'src/api/resources/user'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
};
