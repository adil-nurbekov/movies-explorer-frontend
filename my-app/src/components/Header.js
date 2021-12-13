import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import mainLogo from "../images/headerLogo.svg";
import accLogo from "../images/accLogo.svg";
import BurgerButton from "./main/BurgerButton";

function Header(log, burger) {
  log = true;
  burger = false;
  if (log) {
    return (
      <header className="header-main">
        <div className="header-main__logo-wrapper">
          <img
            className="header-main__logo"
            src={mainLogo}
            alt="фото логотипа"
          ></img>
        </div>
        <div className="header-main__text">
          {" "}
          <NavLink end to="/movies" className="header-main__films">
            Фильмы
          </NavLink>
          <NavLink end to="/saved-movies" className="header-main__films">
            Сохраненные фильмы
          </NavLink>
        </div>

        <div className="header-main__account">
          {" "}
          <Link to="/profile" className="header-main__profile">
            Аккаунт
          </Link>{" "}
          <img className="header-main__profile-img" src={accLogo}></img>
        </div>
        <BurgerButton></BurgerButton>
      </header>
    );
  }
  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <img className="header__logo" src={mainLogo} alt="фото логотипа"></img>
      </div>
      <div className="header__link-wrapper">
        <Link to="/signup" className="header__link-reg">
          Регистрация
        </Link>
        <Link to="/signin" className="header__link-log">
          Войти
        </Link>
      </div>
    </header>
  );
}

export default Header;
