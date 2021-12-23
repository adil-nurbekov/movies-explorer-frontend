import React from "react";
import "./AboutMe.css";
import studentImage from "../../images/studentImage.jpg";

function AboutMe() {
  return (
    <section className="about">
      <h2 className="about__header">Студент</h2>
      <div className="about__student-wrapper">
        <div className="about__student-info">
          <p className="about__student-info_name">Виталий</p>
          <p className="about__student-prof">Фронтенд-разработчик, 30 лет</p>
          <p className="about__student-des">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about__student-links">
            <a
              className="about__student-link"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              to=""
              className="about__student-link"
              href="https://github.com/adil-nurdekov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </ul>
        </div>
        <div className="about__student-image-wrapper">
          <img
            className="about__student-image"
            src={studentImage}
            alt="фото студента"
          ></img>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
