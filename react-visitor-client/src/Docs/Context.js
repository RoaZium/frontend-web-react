/* 
▣ 정의
데이터는 위에서 아래로(즉, 부모로부터 자식에게) props를 통해 전달되지만, context는 일일이 props를 넘겨주지 않고도
컴포넌트 트리전체에 데이터를 제공할 수 있습니다.

1. 언제 context를 써야 할까
- 컴포넌트 트리안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법
- 로그인 유저, 테마, 선호하는 언어 등에 사용

2. context를 사용하기 전에 고려할 것
다양한 레벨에 네스팅된 많은 컴포넌트에게 데이터를 전달하는 것입니다.
context를 사용하면 컴포넌트를 재사용하기가 어려워지므로 꼭 필요할 때만 쓰세요.

3. API
- React.createContext
: Context 객체를 만듭니다.
: Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로 부터 현재값을 읽음.

- Context.Provider
: Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 합니다.
: value props을 받아서 이 값을 하위에 있는 컴포넌트에게 전달
: 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없습니다.
: Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시됩니다.

- Context.Consumer
: context 변화를 구독하는 React 컴포넌트입니다.
: 이 컴포넌트를 사용하면 함수 컴포넌트 안에서 context를 구독할 수 있습니다.
: Context.Consumer의 자식은 함수여야합니다.

 */

import { Button } from "@mui/material";
import React, { useState } from "react";

/* ==================== 01. Example ==================== */
// 정의: 하위 컴포넌트 값 전달

const Context01 = React.createContext();

export function ContextExample() {
  return (
    <Context01.Provider value="HJW">
      <User />
    </Context01.Provider>
  );
}

function User() {
  return (
    <Context01.Consumer>
      {(value) => (
        <>
          <h1>{value}</h1>
        </>
      )}
    </Context01.Consumer>
  );
}

/* ===================================================== */

/* ==================== 02. Example ==================== */
// 기능: 변수 선언 후 값 전달

const Context02 = React.createContext();

export function Example02() {
  const user = {
    name: "홍길동",
    age: 25,
  };

  return (
    <Context02.Provider value={user}>
      <Example021 />
    </Context02.Provider>
  );
}

function Example021() {
  return (
    <Context02.Consumer>
      {(value) => (
        <>
          <h3>user의 이름은 {value.name}입니다.</h3>
          <h3>user의 나이는 {value.age}입니다.</h3>
        </>
      )}
    </Context02.Consumer>
  );
}

/* ===================================================== */

/* ==================== 03. Example ==================== */
// 기능: 하위 컴포넌트에서 conetxt 업데이트 하기

const Context03 = React.createContext(false);

export default function Example03() {
  const [appOpen, setAppOpen] = useState(false);

  return (
    <Context03.Provider value={{ appOpen, setAppOpen }}>
      <Example031 />
    </Context03.Provider>
  );
}

function Example031() {
  const { appOpen, setAppOpen } = React.useContext(Context03);

  return (
    <div>
      <h1>Flag: {String(appOpen)}</h1>
      <Button variant="contained" onClick={() => setAppOpen(!appOpen)}>
        Text
      </Button>
    </div>
  );
}

/* ===================================================== */
