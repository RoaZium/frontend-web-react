import "../../App.css";
import React from "react";

interface SDSideBarProps {
  children: React.ReactNode;
}

const SDSideBar = ({ children }: SDSideBarProps) => {
  return (
    <>
      <div className="nav">{children}</div>
    </>
  );
};

interface SDFullSideBarProps {
  children: React.ReactNode;
}

const SDFullSideBar = ({ children }: SDFullSideBarProps) => {
  return (
    <>
      <div className="nav-full">{children}</div>
    </>
  );
};

export { SDSideBar, SDFullSideBar };
