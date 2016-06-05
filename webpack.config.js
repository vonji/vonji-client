const Webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'src', 'main.js');

const config = {
  devtool: ['eval', 'source-map'],
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    mainPath,
  ],
  output: {
    path: buildPath,
    filename: 'app-bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
    ],
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
