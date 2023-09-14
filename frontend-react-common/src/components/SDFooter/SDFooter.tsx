import "../../App.css";
import React from "react";

interface SDFooterProps {
  children: React.ReactNode;
}

const SDFooter = ({ children }: SDFooterProps) => {
  return <footer className="footer">{children}</footer>;
};

export default SDFooter;
