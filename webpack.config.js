const path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/public/',
    filename: 'build.js',
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(ttf|woff|woff2|eot|svg)$/, loader: 'file' },
    ],
  },

  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime'],
  },

  vue: {
    loaders: {
      scss: 'vue-style!css!sass',
    },
  },
}
