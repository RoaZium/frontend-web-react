목적
다중 proxy 처리

사용방법
1) $ yarn add http-proxy-middleware
2) /src/setupProxy.js 생성

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
3) 사용
: axios 사용시 /posts 라고하면 http://localhost:5000/posts 로 가게 된다
![](2023-02-11-22-29-43.png)