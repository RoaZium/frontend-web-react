import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import SignIn from "./pages/authentication/sign-in/SignIn";

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
    <div>
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
