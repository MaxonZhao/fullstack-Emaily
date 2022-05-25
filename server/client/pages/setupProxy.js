const { createProxyMiddleware } = require('http-proxy-middleware');
import { app } from './index'
module.exports = function() {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};