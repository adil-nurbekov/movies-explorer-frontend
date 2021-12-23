import React from "react";
import "./Preloader.css";

const Preloader = (props) => {
  return (
    <div className={props.loading ? "preloader" : "preloader__off"}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
