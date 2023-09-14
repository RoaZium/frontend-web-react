import React from "react";
import "../../../App.css";

interface LSHCContainerProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
}

const LSHCContainer: React.FC<LSHCContainerProps> = ({
  sidebar,
  header,
  content,
}) => {
  return (
    <div className="container">
      <div className="nav-full">{sidebar}</div>
      <div className="row-container">
        <div className="header-content">{header}</div>
        <div className="content-header">{content}</div>
      </div>
    </div>
  );
};

export default LSHCContainer;
