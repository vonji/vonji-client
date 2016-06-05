const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');
const bundle = require('./server/bundle.js');

app.use(express.static(publicPath));

if (!isProduction) {
  bundle();

  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
