# [기능] CORS

대표적으로 교차 출처 리소스 공유(CORS)와 관련된 에러인데, 이것은 API 서버쪽에서 헤더에 Access-Control-Allow-Origin을 열어주지 않는이상 브라우저단에서 막어비리기 때문에 클라쪽에서는 방법이 없다.

그나마 해결책이 중간에 프록시 서버를 두는 방법인데, React 프로젝트를 사용한다면 간단하게 처리할 수 있다.

# 해결
	1. package.json에 proxy 추가
		a. 예시
			i. 1) CRA로 제작된 프로젝트만 적용가능 (create-react-app)
			ii. 2) package.json에 proxy 추가
			// package.json
			{
				proxy: 'http://localhost:5000'
			}
	2. http-proxy-middleware 사용
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

# 3) 사용
: axios 사용시 /posts 라고하면 http://localhost:5000/posts 로 가게 된다


exportfunctiontest() {
  axios.get('https://m.search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC')
       .then(data=>{
         console.log(data.data)
       })
}
 
바로 CORS에 걸려버렸다.



이걸 해결하는 방법
package.json에 맨 아래쪽에 다음과 같이 m.search.naver.com에 대한 Proxy를 추가한다.

//package.json 
{
	..., 
	..., 
	"proxy": "https://m.search.naver.com" 
}

그리고 나서 호출할 때 URL의 호스트를 지워주면 된다.

export function test() { 
	axios.get('/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC') 
		.then(data => { 
			console.log(data.data) 
		}) 
}

이렇게 호출하면 브라우저에서는 localhost:3000로 부터 API 응답을 인식한다.

그런데 이런 경우 "만약 여러가지 API로 부터 CORS 처리를 관리하려면어떻게 해야하지?" 하는 의문이 들수 있다.

그럴 경우에는 package.json에 Proxy 설정을 하는게 아니라 http-proxy-middleware 라이브러리를 설치한다.

npm install http-proxy-middleware

설치가 끝나면 src에 setupProxy.js 파일을 하나생성하자.(이 루트의 파일명으로자동으로설정되니 다른 설정은 필요없다.)

설치가 끝나면 src에 setupProxy.js 파일을 하나 생성하자. (이 루트의 파일명으로 자동으로 설정되니 다른 설정은 필요없다.
 
//setupProxy.jsconst{ createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app){
  app.use(
    createProxyMiddleware('/naver', {
      target: 'https://m.search.naver.com',
      pathRewrite: {
        '^/naver':''},
      changeOrigin: true})
  )
  
  app.use(
    createProxyMiddleware('/다른context', {
      target: 'https://다른호스트',
      pathRewrite: {
        '^/지우려는패스':''},
      changeOrigin: true})
  )
  
  ...
};

위처럼 설정하면 '/naver'로 시작되는 url을 자동으로 인식하여 프록시 처리해주고, /naver라는 패스는 pathRewrite에서 설정한 것처럼 제거가 가능하다.
 
그래서 이렇게 호출하면 관리가 가능하다.
exportfunctiontest() {
  axios.get('naver/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC')
       .then(data=>{
         console.log(data.data)
       })
}
 
출처: <https://woochan-dev.tistory.com/94> 



