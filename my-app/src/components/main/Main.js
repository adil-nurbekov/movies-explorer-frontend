import React from "react";
import "./Main.css";

import mainImage from "../../images/planet.svg";
import Tech from "./Techs";
import AboutMe from "./AboutMe";
import AboutProject from "./AboutProject";
import Header from "../Header";
import Footer from "../Footer";
import Portfolio from "./Portfolio";

function Main(props) {
  return (
    <>
      <Header isLogedIn={props.isLogedIn} burgerMenu={props.handleBurgerMenu} />
      <main className="main">
        <div className="main__content-wrapper">
          <div className="main__text-wrapper">
            <h1 className="main__header">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="main__des">
              Листайте ниже, чтобы узнать больше про этот
              <br /> проект и его создателя.
            </p>
            <p className="main__link">Узнать больше</p>
          </div>

          <div className="main__image-wrapper">
            <img
              className="main__image"
              src={mainImage}
              alt="фото логотипа"
            ></img>
          </div>
        </div>
        <AboutProject></AboutProject>
        <Tech></Tech>
        <AboutMe></AboutMe>
        <Portfolio></Portfolio>
      </main>
      <Footer />
    </>
  );
}
export default Main;
