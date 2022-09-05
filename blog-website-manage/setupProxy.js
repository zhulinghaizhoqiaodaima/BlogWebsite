
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //   '/api', // 凡是以gateway开头的请求都会被反向代理
  //   createProxyMiddleware({
  //     target: 'http://localhost:9090/',
  //     changeOrigin: true,
  //     // 去掉我们添加的前缀，保证我们传递给后端的接口是正常的
  //     pathRewrite: { "^/api": '' }
  //   })
  // );
};