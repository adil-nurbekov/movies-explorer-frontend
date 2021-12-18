import React from "react";
import { Link, NavLink } from "react-router-dom";
import accLogo from "../../images/accLogo.svg";
import "./BurgerMenu.css";
import closeButton from "../../images/close.jpg";

function BurgerMenu(props) {
  return (
    <>
      <div className={props.isOpen ? "burger-menu burger" : "burger-menu"}>
        <img
          src={closeButton}
          className="burger-menu__close"
          onClick={props.closeBurger}
        ></img>
        <div className="burger-menu__content">
          <NavLink className="burger-menu__content__list" end to="/">
            Главная
          </NavLink>
          <NavLink className="burger-menu__content__list" end to="/movies">
            Фильмы
          </NavLink>
          <NavLink
            className="burger-menu__content__list"
            end
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
          <div className="burger-menu__account">
            <Link className="burger-menu__content__account" to="/profile">
              Аккаунт
            </Link>
            <img
              className="burger-menu__content__account-img"
              src={accLogo}
              alt="лого"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
export default BurgerMenu;
