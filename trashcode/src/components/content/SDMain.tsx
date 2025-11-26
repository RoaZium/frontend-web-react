import "../../App.css";
import React from "react";

interface SDMainProps {
  children: React.ReactNode;
}

const SDMain = ({ children }: SDMainProps) => {
  return <main className="main">{children}</main>;
};

export default SDMain;
