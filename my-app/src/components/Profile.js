import React, { useState, useEffect } from "react";
import { CurrentUser } from "../context/CurrentUser";

import "./Profile.css";
import Header from "./Header";
import { Link } from "react-router-dom";

function Profile(props) {
  const user = React.useContext(CurrentUser);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    props.change(name, email);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const signOut = () => {
    localStorage.removeItem("jwt");
  };
  return (
    <>
      <Header burgerMenu={props.handleBurgerMenu}></Header>
      <div className="profile">
        <div className="profile__wrapper">
          <div className="profile__header">Привет {user.name}!</div>
          <form className="profile__form" onSubmit={onSubmit}>
            <p className="profile__label">Имя</p>
            <input
              className="profile__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <p className="profile__label">Email</p>
            <input
              className="profile__input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <button className="profile__button">Редактировать</button>
            <Link to="/" className="profile__button" onClick={signOut}>
              Выйти из аккаунта
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default Profile;
