import "../../../App.css";
import React from "react";

import SDHeader from "../../header/SDHeader";
import { SDSideBar } from "../../SDSideBar/SDSideBar";
import SDMain from "../../content/SDMain";
import SDFooter from "../../footer/SDFooter";

const HLSCContainer = () => {
  return (
    <div>
      <SDHeader>Header</SDHeader>
      <div className="header-main-footer-content">
        <SDSideBar>SideBar</SDSideBar>
        <SDMain>Content</SDMain>
      </div>
      <SDFooter>Footer</SDFooter>
    </div>
  );
};

export default HLSCContainer;
