import React from "react";
import "./Nav.css";
import { Link, NavLink } from "react-router-dom";
import accLogo from "../images/accLogo.svg";
const Nav = (props) => {
  if (props.isLogedIn) {
    return (
      <>
        <Link to="/" className="nav-main__logo"></Link>

        <div className="nav-main__text">
          {" "}
          <NavLink end to="/movies" className="nav-main__films">
            Фильмы
          </NavLink>
          <NavLink end to="/saved-movies" className="nav-main__films">
            Сохраненные фильмы
          </NavLink>
        </div>

        <div className="nav-main__account">
          {" "}
          <Link to="/profile" className="nav-main__profile">
            Аккаунт
          </Link>{" "}
          <img className="nav-main__profile-img" src={accLogo} alt="лого"></img>
        </div>
        <div className="nav__burger" onClick={props.burgerMenu}>
          <span />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link className="nav-main__logo" to="/"></Link>

        <div className="nav__link-wrapper">
          <Link to="/signup" className="nav__link-reg">
            Регистрация
          </Link>
          <Link to="/signin" className="nav__link-log">
            Войти
          </Link>
        </div>
      </>
    );
  }
};
export default Nav;
