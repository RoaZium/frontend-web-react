import React from "react";
import "../../App.css";

interface SDHeaderProps {
  children: React.ReactNode;
}

const SDHeader = ({ children }: SDHeaderProps) => {
  return (
    <>
      <div className="header">{children}</div>
    </>
  );
};

export default SDHeader;
