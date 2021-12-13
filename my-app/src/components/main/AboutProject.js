import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__header"> О проекте</h2>
      <div className="about-project__dip-wrapper">
        <div className="about-project__dip">
          <h3 className="about-project__dip_header">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__dip_text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            <br />
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__dip">
          <h3 className="about-project__dip_header">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__dip_text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            <br /> соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline-wrapper">
        <p className="about-project__timeline-week">1 неделя</p>
        <p className="about-project__timeline-weeks">4 недели</p>
        <p className="about-project__timeline-backend">Back-end</p>
        <p className="about-project__timeline-frontend">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
