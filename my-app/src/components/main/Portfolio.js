import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";
function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio-header">Портфолио</h3>
        <div className="portfolio-app-wrapper">
          <p className="portfolio-app-name">Статичный сайт</p>
          <img className="portfolio-app-arrow" src={arrow} alt="стрелка"></img>
        </div>
        <div className="portfolio-app-wrapper">
          <p className="portfolio-app-name">Адаптивный сайт</p>
          <img
            className="portfolio-app-arrow"
            src={arrow}
            alt="стрелка"
            м
          ></img>
        </div>
        <div className="portfolio-app-wrapper">
          <p className="portfolio-app-name">Одностраничное приложение</p>
          <img className="portfolio-app-arrow" src={arrow} alt="стрелка"></img>
        </div>
      </section>
    </>
  );
}
export default Portfolio;
