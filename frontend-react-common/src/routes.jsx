import React from "react";
import SignIn from "./pages/authentication/sign-in/SignIn";
import MyFlow from "./pages/MyFlow/MyFlow";

const routes = [
  {
    name: "Sign In",
    route: "/sign-in",
    component: <SignIn />,
  },
  {
    name: "My Flow",
    route: "/myflow",
    component: <MyFlow />,
  },
];

export default routes;
