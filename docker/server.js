// Config from https://github.com/make-software/casper-nctl-docker/blob/master/cors/server.js

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 11100;

const originWhitelist = (
  process.env.ORIGIN_WHITELIST ||
  `
  http://localhost:8080,
  http://localhost:4200,
  https://localhost:8080,
  https://localhost:4200
  `
)
  .replace(/\s+/g, '')
  .split(',');

var cors_proxy = require('cors-anywhere');
cors_proxy
  .createServer({
    originWhitelist,
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
