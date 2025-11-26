import React from "react";

const divStyle = {
  container: {
    // margin: "10px",
    // height: "calc(100vh - 20px)", // 브라우저 높이에서 margin 값만큼 뺀 값
    height: "100vh",
    overflow: "auto", // 스크롤 없애기
  },
};

export default function BaseWireFrame(props: any) {
  return <div style={divStyle.container}>{props.children}</div>;
}
