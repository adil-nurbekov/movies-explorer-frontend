import React from "react";
import { Link, NavLink } from "react-router-dom";
import accLogo from "../../images/accLogo.svg";
import "./BurgerMenu.css";

function BurgerMenu(active) {
  active = false;
  return (
    <>
      <div className={active ? "burger-menu" : "burger"}>
        <div className="burger-menu__blur">
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
              <Link className="burger-menu__content__account" to="/account">
                Аккаунт
              </Link>
              <img
                className="burger-menu__content__account-img"
                src={accLogo}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BurgerMenu;
