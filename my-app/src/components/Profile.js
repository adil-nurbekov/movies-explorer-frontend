import React from "react";
import "./Profile.css";
import Header from "./Header";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <Header></Header>
      <div className="profile">
        <div className="profile__wrapper">
          <div className="profile__header">Привет, Виталий!</div>
          <form className="profile__form">
            <p className="profile__label">Имя</p>
            <input className="profile__input"></input>
            <p className="profile__label">Email</p>
            <input className="profile__input"></input>
            <button className="profile__button">Редактировать</button>
            <Link to="/" className="profile__button">
              Выйти из аккаунта
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default Profile;
