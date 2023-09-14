### NPM 종류

- react-router-dom
  : 클라이언트 측 라우팅을 가능하게 합니다

  import { Drawer } from "@mui/material";
  import React from "react";
  import { Routes, Route } from "react-router-dom";
  import "./App.css";
  import FlowLogin from "./layouts/authentication/sign-in";
  import routes from "./routes";
  import SideBar from "./components/SideBar";
  import SDFooter from "./components/SDFooter/SDFooter";

const getRoutes = (allRoutes) =>
allRoutes.map((route) => {
return (
<Route
        exact
        path={route.route}
        element={route.component}
        key={route.key}
      />
);
});

function App() {
return (

<div className="container">
<header className="header">
<h2>Header</h2>
</header>
<div className="main-content">
<nav className="nav">
<h2>Sidebar</h2>
</nav>
<main className="main">
<h2>Content</h2>
</main>
</div>
<SDFooter>
<h2>Footer</h2>
</SDFooter>
</div>
);
}

export default App;
