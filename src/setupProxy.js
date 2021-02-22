//src下setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
//当访问以'/api'开头的时候就访问3001端口，我们外部的数据端口
const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:8000/' });

module.exports = function (app) {
    app.use(apiProxy);
};