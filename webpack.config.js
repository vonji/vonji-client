module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: 'build',
    publicPath: '/assets/',
    filename: 'app-bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
    ],
  },
};
