# 정의
SSR, SEO, TypeScript까지 생산에 필요한 많은 기능들을 제공하는 강력한 React 프레임워크이다.

# 목적
SSR, SEO 등을 하기 위한 React Framework인데 사용자가 초기에 Server에 페이지 접속을 요청한경우 SSR방식으로 렌더링 될 HTML을 보내줌으로써 SEO 최적화가 되어 검색엔진에 노출이 될 수 있고 이 후 사용자가 페이지와 상호작용 할 때는 CSR방식으로 브라우저에서 처리함으로써 SPA 장점 또한 가지게 된다

주의
데이터 변동이 빈번하게 일어나면 pre-render 하지 않고 클라이언트 사이드에서 랜더링하는 것을 권장하고있다.




Next.js는 React Framework
💪 SEO를 위한, SSR을 해주는 프레임워크라고만 알고있었다.
서버에서 미리 렌더링하는 것, 클라이언트에서 렌더링하는 것의 속도차이를 먼저 영상으로 확인해보고 글을 진행합니다.
pre-render 유무의 따른 속도차이비교
 
클라이언트 렌더링

서버 pre-rendering
깜빡거리는건 새로고침입니다.

👏
Next.js가 해주는 것들
React에서 고려했어야할 것들을 해준다.
• 웹팩과 같은 번들러로 코드를 번들
• 바벨과 같은 컴파일러를 사용해 변환(브라우저에 적용되지 않을 수 있는 코드를 문법에 맞도록 트랜스파일링)
• 코드스플리팅으로 production 최적화
• 성능 또는 SEO를 위한 Pre render (SSR, CSR을 사용)
추가로, Next.js는 다음과 같은 기능을 제공한다.
• 직관적인 페이지기반 라우팅 시스템
• Pre-render, static generation, ssr을 페이지 기반으로 지원
• Static generation : 빌드 타임(npm run build) 때 HTML을 각 페이지별로 생성해놓고 요청왔을 때 생성된 HTML을 반환
• SSR : 요청이 올 때마다 해당하는 HTML문서를 그때 그때 생성해 반환

1. SSG, SSR ?
SSG, SSR 둘은 다르다.
SSG는 Static Site Generation로 말 그대로 정적 사이트 생성이다.
Build타임 때 (next build를 했을 때) 정적인 HTML파일들이 서버에 생성되는 것을 의미한다.
그러므로 유저가 페이지를 요청했을 때 이미 생성된 HTML만 반환하면 되므로, 이 HTML들은 재사용할 수 있다.
이미 생성된 파일이 있기에 다른 유저가 같은 url로 요청했을 때 어떠한 작업도 하지않고 HTML만 반환하면 되므로 응답속도가 매우 빠르다.(초기렌더링속도)
Next.js에선 기본적인 방법으로 SSG를 사용해 데이터유무에 관계없이 정적인 페이지를 만들어낼 수 있다.
예를들어 외부 요청에 의해 변하지않는 페이지(랜딩페이지)같은 경우 1번만 만들어 놓으면 HTML을 반환하기만 하면되므로 SSG로 작성할 수 있다.
외부 요청에 의해 내부 내용이 변하는 페이지(게시글목록)은 SSR 또는 CSR로 처리하면 된다.
pre-render를 하느냐 마느냐에 따라 클라이언트측에서 렌더링할 것인지, 서버에서 렌더링할 것인지 결정된다.
pre-render를 하면 빌드타임 때 데이터요청을 보내 그 때 얻은 결과로 정적 페이지를 생성하는 것이다.
pre-render를 하지 않으면 뼈대만 미리 SSG로 만들어 놓고 나머지 데이터들은 브라우저에서 JS가 로드될 때 수행되어 채워진다.
공식문서에서는 데이터 변동이 빈번하게 일어나면 pre-render하지않고 클라이언트 사이드에서 랜더링하는 것을 권장하고 있다.
그러나 SSG를 하더라도 요청에 따른 정적페이지를 또 생성할 수 있는 방법이 존재하긴 한다. (하위 빌드시점에 없는 데이터가 추가되고 사용자가 페이지로 접속할 때 - 목차 참고)
먼저, SSG를 하기위한 함수사용 그리고 예제코드들을 살펴보자.

1.1 SSG with Data
SSG는 보통 많이 변하지 않는 데이터를 갖는 페이지를 미리 만들어 놓을 때 사용된다.
build Time때 페이지를 생성해두는 방식이다.(꼭 그렇지만은 않음: 검증완료-하단참고 , 그러나 해당 데이터의 변화가 생기면 반영되지는 않을 것이라고 생각됨 - 검증 전.)
공식문서에서는 블로그, e-커머스 상품리스트, 등에 사용된다고 소개한다.
페이지를 미리 만들어놓는 SSG는 pre-render를 위한 두가지 시나리오가 있고 그때 사용되는 함수가 다르다.
1. 페이지가 외부데이터에 의존적일 때 : api요청을 통해 페이지 내부를 채우는 경우 - getStaticProps를 사용
2. 페이지의 path가 외부데이터에 의존적일 때 : 상세페이지의 경우 상품 클릭시 id값에 해당하는 요청을 보내 이에 대한 응답으로 페이지 내용을 채우는 경우 - getStaticPaths + getStaticProps를 사용
쉽게말해 외부데이터를 받아오고, path를 통해 외부 데이터를 요청하는지라는 두가지 케이스다.
 

1. getStaticProps : 단일 데이터 pre-render
Build time에 호출되고 fetch된 데이터를 해당 페이지의 props로 전달해 Pre-render함.
pre-render를 하기 위해서 먼저 페이지에 필요한 데이터를 fetch할 때 사용되는 함수다.
export, async로 같은 파일 내 getStaticProps함수가 호출되어야한다.
데이터가 필요한 파일 내에서 데이터 fetch를 해서 props로 전달해주는 방식이다.
exportdefaultfunctionHome({ res: products }) {
  // const [products, setProducts] = useState([]);// useEffect(() => {//   const getStoreData = async () => {//     const res = await fetchStoreApi();//     setProducts(res);//   };//   getStoreData();// }, []);return(
    <div><Header/><ProductListproducts={products}/></div>);
}
export async function getStaticProps() {
  const res = await fetchStoreApi();
  return {
    props: {
      res,
    },
  };
}

getStaticProps 적용결과

 
적용전
• 적용하기 전 주석처리된 useEffect로 클라이언트사이드에서 데이터를 fetch했을 때 3초~4초정도 걸렸다.
 
적용 후
 
• 3.7s -> 0.8s로 70%이상 향상됐다 🤩(인터넷에 따라 다를 수 있음, 시크릿모드에서 수행)

2. getStaticPaths, getStaticProps : 동적라우팅 페이지 pre-render
동적라우팅을 쓰고 있을 때 getStaticProps 사용한다.
Build time때 요청을 보내고 이에 따른 페이지들을 생성해야하므로 경로들을 미리 getStaticPaths함수로 정의해줘야한다.
경로가 생성되면, getStaticProps를 통해 데이터요청을 보내어 해당하는 데이터로 HTML을 채워 생성한다.
💡 동적라우팅페이지에서 쿼리스트링에 따라 불러오는 데이터가 달라지니깐 getStaticPaths로 먼저 동적라우팅목록을 정의하고 getStaticProps로 해당하는 목록의 데이터를 fetching해서 props로 전달해주는 것이다.
🤔 1000개의 post가 있을 때 서버에 1000개의 HTML파일이 생기는지 ?
💡 pre-render를 하면 페이지 갯수만큼 정적파일이 생긴다.
 
코드
constId = ({ product }) => {
  constrouter = useRouter();
  const{ id } = router.query;
  return<Product product={product} id={id} />;
};
export asyncfunction getStaticPaths(){
  constproducts = awaitfetchStoreApi();
constpaths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
return{ paths, fallback: false};
}
export asyncfunction getStaticProps({ params}){
constproduct = awaitfetchStoreApi(params.id);
return{ props: { product } };
}
• pages/posts/[id.js]처럼 동적라우팅을 사용하는 부분에서getStaticPaths를 사용해야정의된 id목록을 가지고 데이터를 fetch할 수 있기에 해당 페이지를pre-render할 수 있다.

 
getStaticPaths의 반환 key
path,fallback은 필수
path는 다음과 같은 형태를 띄어야한다.
 paths: [
    { params: { id: '1'} },
    { params: { id: '2'} }
  ],
• 동적라우팅하는 filename이 [id].js이므로 해당 값을 맞춰주어야한다.
 
Fallback
• fallback도 필수 key, boolean의 값이다.
• false인 경우getStaticPaths에서 정의되지 않은 경로는 모두 404페이지가 된다. 따라서빌드시점에 없는 페이지는 무조건 404로 넘어간다.
• true인 경우는 getStaticProps를 통해 해당 URL에 필요한 data를 요청한다.
• 🤔 빌드시점에 20개 페이지가 생성되었고 이후에 사용자에 의해 21번째 글이 생겼다고 가정해보았을 때, false값이면 21번째 페이지접근시 404로 넘어갈 것이고 true면 21번째페이지에 해당하는 요청을 보내고 데이터가 있으면 이에 해당하는 html이 생성되는것인가?
• 💡맞다. 빌드시점에 없는 파일을 요청했을 때 getStaticProps에서 해당하는 id로 데이터 fetch를 하고 새로운 html정적파일을 생성해놓는다.
• false로 두면 빌드시점에 없는 요청이면 무조건 404로 넘어가고 true면 요청을 한번 보내고 데이터가 있다면 html을 생성, 없다면 이에 대한 처리를 개발자가 해주어야한다.

 
🤔 빌드시점에는 없었던 데이터가 추가되고 사용자가 해당 페이지로 접속할 때
fallback을 이해하기 위해 코드를 작성해보며 확인했다.
fallback을 true로 놓으면 빌드시점에 없는 파일일 때 요청을 한번 더 보낸다고 했는데, 사용자가 1000만건을 보내면 그만큼 정적파일이 생기게되므로 이를 막아주는 코드가 필요했다.
서버를 작성하는 것보다 약간의 trick을 사용해서 생각을 검증했다.
exportasyncfunctiongetStaticPaths() {
  constproducts = awaitfetchStoreApi();
  constpaths = products.map((product) =>({
    params: { id: product.id.toString() },
  }));
  return{ paths, fallback: true};
}
exportasyncfunctiongetStaticProps({ params }) {
  if(params.id == 9999) {
    constproduct = awaitfetchStoreApi(1);
    return{ props: { product } };
  }
  constproduct = awaitfetchStoreApi(params.id);
  return{ props: { product }};
}
• 총 데이터가 20개밖에 없는 api에서 product/9999에 접속하면 에러가 난다. 그러나 fallback을 true로 지정해 요청을 한번 보내도록 작성해놓았다.
• 코드대로 본다면 9999페이지 접근시 1번 데이터를 받아오고 9999.html를 생성할 것이라고 생각했고 맞았다.
• 없는 데이터의 경우에도 html파일이 역시 생겼는데 이를 막기위한 코드는 다음과 같다.
 
코드
export asyncfunction getStaticProps({ params}){
  if(params.id == 9999) {
    constproduct = awaitfetchStoreApi(1);
    return{ props: { product } };
  }
  if(!product) {
      return{
        notFound: true,
      };
  }
  constproduct = awaitfetchStoreApi(params.id);
  return{ props: { product }};
}
• getStaticProps의 옵션인 notFound를 true로 주면 404페이지로 이동되고 html도 생기지 않는다.
• 🤔 그러나 해당 데이터가 변화되면 HTML이 새로 생기지 않을 것이라고 생각됨.

 
적용 결과
 

 
적용 전 단일페이지에 대한 결과가 4초정도 걸렸다.
 
 

 
적용 후 0.2초가 걸리는 것을 확인할 수 있었다.
 
 
💡 직접 확인해본 것 : 페이지 데이터 갯수만큼 정적파일이 생긴다.


 
1.2 SSR
사용자의 요청마다 HTML이 생성된다.
요청에 따른 응답될 내용이 때때로 바뀌는 경우 사용한다.

1. getServerSideProps
브라우저에서 실행되지 않고 서버측에서만 실행되는 함수
비동기요청의 딜레이때문에 빈 값이 화면에 노출되고 이후 리랜더링되며 결과가 보여지는 것을 피하고자할 때 미리 서버에서 render를 해두어 결과만을 브라우저에 보여주기 위함
getServerSideProps 클라이언트에서 랜더하는거랑 뭐가다른가 ?
• 클라이언트에서 하면 데이터 요청 전, 빈 화면을 랜더링해주는데 이를 사용하면 서버측에서 미리 render를 해놓고 반환하므로 랜더링된 결과가 화면에 전부 나타남
• 페이지가 생기지도 않고 그저 들어온 요청을 서버에서 수행해서 클라이언트에게 반환해주는 방식이다.
• 이 함수에서 사용된 모듈은 클라이언트에 번들로 제공되지 않아 filesystem이나 db작업을 할 수 있다고한다.
 
getServerSideProps 언제쓰는데 ?
• 요청시 페이지를 pre-render하는 경우에만 사용해야한다.
• 서버에서 모든 요청을 처리해야하고 추가 구성없이 CDN에서 캐시될 수 없기에 getStaticProps보다 느리다고 한다.
• 따라서 데이터를 pre-render할 필요없다면 클라이언트측에서 fetch하는 것을 고려해야한다고 한다.
 
코드
constId = ({ product }) => {
  constrouter = useRouter();
  const{ id } = router.query;
  return<Product product={product} id={id} />;
};
export defaultId;
export asyncfunction getServerSideProps(context){
  const{ params} = context;
  constproduct = awaitfetchStoreApi(params.id);
  return{
    props: { product }, // will be passed to the page component as props};
}

 
2. 라우팅
Next.js에서는 react-router-dom이 필요없다. pages 폴더안에 컴포넌트를 생성하면 자동으로 경로가 설정된다.
 
2.1 정적라우팅
Link라는 래퍼컴포넌트로 감싼 요소를 클릭하면 지정한 경로로 이동한다.
웹접근성을 생각한다면 a태그로 감싸는 편이 좋다.
//pages/about.js를 생성해두어야함.importLink from"next/link";
exportdefaultfunctionHome() {
  return(
    <div><Linkhref="/about"><astyle={{fontSize:20}}>About Page</a></Link><p>Hello Next.js</p></div>)
}

2.2 동적라우팅
[ ] 대괄호로 파일명을 감싸면 해당 컴포넌트는 동적으로 경로가 지정된다.
importLink from"next/Link";
exportdefaultfunctionApp() {
  return(
    <div><Linkhref="/about/1"><a>about id</a></Link></div>);
}
//pages/about/[id].jsimportReact from'react';
import{ useRouter } from'next/router';
constId = ()=>{
  constrouter = useRouter();
  const{ id } = router.query; 
  console.log(router, id);//id === 1return(
    <div>about id 페이지 !
    </div>);
};
exportdefaultId;
• 경로정보를 담는 router객체를 불러오기 위해 useRouter를 사용한다.
• 해당 객체의 query에는 우리가 지정해 전달한 id값이 있어 확인할 수 있다..

3. Styled Components
아무런 설정없이 바로 Styled-components를 사용하면 에러가 발생한다.
className did not match ....라는 에러인데, 첫 화면에서 SSR로 렌더링하면서 오류가 발생하지 않지만, 그 다음은 CSR로 렌더링하게 되어 서버-클라간 className이 일치하지 않아 발생하는 문제라고 한다.
.babelrc 생성
//.babelrc
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false}
    ]
  ]
}
• 이렇게만하면 에러가 발생하진 않지만, babel-plugin을 설치해 추가적인 정보를 얻을 수 있다.
babel-plugin
npm i babel-plugin-styled-components 설치
//.babelrc
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "fileName": true, "displayName": true, "pure": true}
    ]
  ]
}
• pure: 사용하지 않는 속성제거
• fileName, displayName: 클래스명에 파일명, 스타일정보를 추가시켜준다 -> ProductList_Wrapper_asdca123mv_vsf...

4. Image
Import Image from 'next/image';
기본 img태그를 확장한 컴포넌트
이미지 최적화를 해줌
Lazy loading설정 간편
외부 이미지를 loading하려고할 때 next.confing.js에 설정해주어야한다.
module.exports= {
  images: {
    domains: ["도메인명.com"],
  },
};
width, height를 설정해주어야하며 그렇지 않는다면 layout속성을 사용한다.
이외에도 캐싱, 반응형처리 또 이외의 속성도 여러개가 있으므로 필요시 공식문서 에서 참고해 사용하자
 

새로 알게된 것
 
pre-render의 의미와 SSG, SSR의 차이를 알게되었다.
SSG는 정적사이트 생성을 미리 build time때 해두어 클라이언트에서 어떤 비동기요청도 하지 않고 빠르게 결과만을 볼 수 있어 초기렌더링에 매우 뛰어난 우위를 가진다.
다만, 페이지의 성격에 따라 SSG를 할지, CSR을 할지 아니면 SSR을 할지 잘 고려해서 선택해야한다.
Next.js에서는 이를 유연하게 선택할 수 있는 프레임워크다. 또한 기본적으로 SSG방식을 사용하므로 SEO에 유리하다.
Next.js가 SSR을 위한 프레임워크라고만 알고 있었는데 공식문서와 예제를 직접 코딩해보며 느낀점은 다르다.
Next.js는 기본으로 정적페이지를 생성해주는 프레임워크였다.
따라서 SSR. 즉, 서버측에서 미리 랜더링해주는 것은 맞지만 Build Time때 할 것인지, Runtime때 할 것인지 결정짓는 것은 개발자가 정해야한다.
따라서 data-fetching을 클라이언트에서 수행할 수 있고, build time때 그리고 runtime때 pre-render를 할 수 있다.
페이지내 데이터의 변동성에 따라 렌더하는 방법을 잘 선택해야한다.

출처:  https://watermelonlike.tistory.com/180 [수박수의 블로그]

출처: <https://watermelonlike.tistory.com/180> 
