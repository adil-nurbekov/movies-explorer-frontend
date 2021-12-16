import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";
function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio-header">Портфолио</h3>
        <a
          className="portfolio-app-wrapper"
          href="http://nurbekov.nomoredomains.work/"
          target="_blank"
        >
          <p className="portfolio-app-name">Статичный сайт</p>
          <img className="portfolio-app-arrow" src={arrow} alt="стрелка"></img>
        </a>
        <a
          className="portfolio-app-wrapper"
          href="http://nurbekov.nomoredomains.work/"
          target="_blank"
        >
          <p className="portfolio-app-name">Адаптивный сайт</p>
          <img
            className="portfolio-app-arrow"
            src={arrow}
            alt="стрелка"
            м
          ></img>
        </a>
        <a
          className="portfolio-app-wrapper"
          href="http://nurbekov.nomoredomains.work/"
          target="_blank"
        >
          <p className="portfolio-app-name">Одностраничное приложение</p>
          <img className="portfolio-app-arrow" src={arrow} alt="стрелка"></img>
        </a>
      </section>
    </>
  );
}
export default Portfolio;
