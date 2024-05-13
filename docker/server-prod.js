const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const proxyConfig = require('./proxy.conf.json');
// console.log(proxyConfig);

app.use(express.static('dist'));

// Loop through proxy configurations and create proxy middleware dynamically
Object.keys(proxyConfig).forEach((route) => {
  const config = proxyConfig[route];
  if (config.pathRewrite) {
    // Append the path to the target URL
    config.target = config.target + '/rpc';
    // Remove pathRewrite from config object
    delete config.pathRewrite;
  }
  config.changeOrigin = true;
  app.use(route, createProxyMiddleware(config));
});

// Redirect everything else to the Angular application
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
