# 정의
소스코드를 분석하여 문법적인 오류나 스타일적인 오류, 적절하지 않는구조 등에 표시를 달아주는 행위

# 사용 이유
그래서 왜 Linter를 쓸까
프로젝트를 진행할 때 작성해야 하는 코드는 작은 프로젝트가 아니라면 그 양이 어마어마합니다. 그런데 코드에 대한 상세한 규약을 온전히 사람이 관리해야 한다면 어떨까요?
 
소스 코드는 세미콜론을 꼭 붙이고, 변수 선언 이후에는 한 줄 띄어쓰고, 화살표 함수 말고 기본 function을 쓰고...
이러한 규약이 적다면 그나마 기억하기 쉽겠지만, 규칙이 세부화 되거나 혼자 개발하는 것이 아닌 다른 사람과의 협업을 해야하는 상황이라면 규약을 지키기가 아주 난감하게 됩니다.
 
이러한 애로사항을 해결하는 방법이 바로 Linter 입니다.
 
특히 자바스크립트(이하 JS)의 경우는 컴파일 과정이 없는 인터프리터 언어이기 때문에, 코드가 실행되는 런타임 환경에서 에러가 발생할 수 있게 됩니다.
이런 불상사를 방지하기 위해 런타임 이전에 코드의 오류를 찾을 수 있도록 Linter를 사용하는 것이 좋습니다.
JS의 대표적인 린터의 종류
이전엔 JSLint, JSHint 등의 린트들이 많이 쓰였으나 최근은 거의 ESLint를 사용하는 추세입니다.
별개로 Typescript만을 위한 lint인 TSLint도 있으나, 현재는 ESLint와 통합으로 Deprecated 되었습니다.


# Prettier, ESLint 설정하기

## ESLint 설치
$ npm installeslint --save-dev

## Prettier 설치
$ npm installprettier --save-dev --save-exact  

## Prettier, ESLint 관련 설정 모듈들 설치  
$ npm installeslint-plugin-prettier eslint-config-prettier --save-dev  
- eslint-plugin-prettier
- ESLint와 Prettier이 충돌할 수 있는 설정들을 비활성화 시켜줍니다.
- eslint-config-prettier
- ESLint의 포맷 기능이 아닌 Prettier의 포맷 기능을 사용하게 만들어 줍니다.

## Extension 설치하기 (Only used VSCode)
VSCode extension에서 Prettier ESLint를 설치해줍니다.  
ESLint 설정 파일 작성하기  
프로젝트 최상단 Root 경로에 .eslintrc.js 파일을 생성 해줍니다.  
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
         // typescript 표준 규칙 모음"plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // import 관련 규칙 모음"plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react",
         // prettier 관련 규칙 모음],
    parserOptions: {
        ecmaVersion: 2018,
        project: ["./tsconfig.json"],
        // tsconfig 파일의 경로를 참조 해줍니다. // 기준은 root 입니다.},
    rules: {
            // 추가하고 싶은 rule을 더 추가해줍니다.}
};  

지금은 간소화된 파일이지만,  https://eslint.org/docs/rules/ 에서 원하는 설정을 추가해가며 사용하면 됩니다.  

## Prettier 설정 파일 작성하기
프로젝트 최상단 Root 경로에 .prettierrc.js 파일을 생성 해줍니다.
module.exports= {
    endOfLine: "lf",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    printWidth: 120,
};

지금은 간소화된 파일이지만, 에서 원하는 설정을 추가해가며 사용하면 됩니다.
VSCode 사용자 설정하기 (Only used VSCode)
VSCode의 settings.json 파일을 수정해줍니다.
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"},
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"},
    "editor.formatOnSave": true}
이렇게까지 설정하고 나면 저장할 때마다 코드가 자동으로 포매팅 되는 것을 확인할 수 있습니다.

출처: <https://kimdabin.tistory.com/entry/Reactjs-ESLint%EC%99%80-Prettier%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-React-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95-VSCode> 
