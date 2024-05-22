const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://xua8seev0d.execute-api.us-east-1.amazonaws.com/',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware(proxy)
  );
};