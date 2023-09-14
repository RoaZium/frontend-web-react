import "../../../App.css";
import React from "react";

import SDHeader from "../../SDHeader/SDHeader";
import { SDSideBar } from "../../SDSideBar/SDSideBar";
import SDMain from "../../SDMain/SDMain";

const HLSCContainer = () => {
  return (
    <div>
      <SDHeader>Header</SDHeader>
      <div className="header-main-content">
        <SDSideBar>SideBar</SDSideBar>
        <SDMain>Content</SDMain>
      </div>
    </div>
  );
};

export default HLSCContainer;
