import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import accLogo from "../images/accLogo.svg";

function Header(props) {
  if (!props.isMain) {
    return (
      <header className="header-main">
        <Link to="/" className="header-main__logo"></Link>

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
          <img
            className="header-main__profile-img"
            src={accLogo}
            alt="лого"
          ></img>
        </div>
        <div className="nav__burger" onClick={props.burgerMenu}>
          <span />
        </div>
      </header>
    );
  }
  return (
    <header className="header">
      <Link className="header-main__logo" to="/"></Link>

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
