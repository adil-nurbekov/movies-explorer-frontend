import React from "react";
import "./Preloader.css";

const Preloader = (props) => {
  return (
    <div className={props.loading ? "movie-preloader" : "movie-preloader__off"}>
      <div className="movie-preloader__container">
        <span className="movie-preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
