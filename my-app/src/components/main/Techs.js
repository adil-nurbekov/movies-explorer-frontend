import React from "react";
import "./Techs.css";

function Tech() {
  return (
    <section className="techs">
      <h2 className="techs__header">Технологии</h2>
      <p className="techs__text"> 7 технологий</p>
      <p className="techs__des">
        На курсе веб-разработки мы освоили технологии, которые применили
        <br /> в дипломном проекте.
      </p>
      <div className="techs__tech-wrapper">
        <p className="techs__tech"> HTML</p>
        <p className="techs__tech">CSS</p>
        <p className="techs__tech">JS</p>
        <p className="techs__tech">React</p>
        <p className="techs__tech">Git</p>
        <p className="techs__tech">Express.js</p>
        <p className="techs__tech">mongoBD</p>
      </div>
    </section>
  );
}
export default Tech;
