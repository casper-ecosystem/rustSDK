const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rpc',
    createProxyMiddleware({
      target: process.env.REACT_APP_NODE_ADDRESS || 'http://127.0.0.1:11101',
      changeOrigin: true,
    })
  );
};
