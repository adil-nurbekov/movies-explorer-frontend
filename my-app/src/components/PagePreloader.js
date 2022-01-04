import React from "react";
import "./PagePreloader.css";

const PagePreloader = (props) => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default PagePreloader;
