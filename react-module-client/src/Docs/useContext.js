/* 

▣ 정의
useContext를 적용하게 되면 return 구문에서 <Context.Consumer> 같은 태그를 작성해야되는 불편함이 줄어들고,
Context를 불러온 후 변수에 저장해서 바로 사용할 수 있다.

 */

import React, { createContext, useContext } from "react";

/* ==================== 01. Example ==================== */

// Context 객체를 생성한다.
export const AppContext = createContext();

export default function Example01() {
  const user = {
    name: "홍길동",
    age: 25,
  };

  return (
    <>
      <AppContext.Provider value={user}>
        <div>
          <Children />
        </div>
      </AppContext.Provider>
    </>
  );
}

const Children = () => {
  const user = useContext(AppContext);
  return (
    <>
      <h3>user의 이름은 {user.name}입니다.</h3>
      <h3>user의 나이는 {user.age}입니다.</h3>
    </>
  );
};

/* ===================================================== */
