const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'bin'),
    publicPath: '/public/',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
};
