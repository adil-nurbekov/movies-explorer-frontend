import React, { useState, useEffect } from "react";
import { CurrentUser } from "../context/CurrentUser";

import "./Profile.css";
import Header from "./Header";
import { Link } from "react-router-dom";

function Profile(props) {
  const user = React.useContext(CurrentUser);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");

  const [emailisValid, setEmailIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [formIsvalid, setFormIsValid] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    props.change(name, email);
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    if (user.name === name) {
      return setFormIsValid(false);
    } else setFormIsValid(nameIsValid && emailisValid);
  }, [name]);

  return (
    <>
      <Header burgerMenu={props.handleBurgerMenu}></Header>
      <div className="profile">
        <div className="profile__wrapper">
          <div className="profile__header">Привет {user.name}!</div>
          <form className="profile__form" onSubmit={onSubmit}>
            <p className="profile__label">Имя</p>
            <input
              minLength="2"
              maxLength="40"
              required
              className="profile__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorName(e.target.validationMessage);
                setNameIsValid(e.target.checkValidity());
              }}
            ></input>
            <span className="profile__error">{errorName}</span>
            <p className="profile__label">Email</p>
            <input
              className="profile__input"
              type="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailIsValid(e.target.checkValidity());
                setErrorEmail(e.target.validationMessage);
              }}
            ></input>
            <span className="profile__error">{errorEmail}</span>
            <button
              className={
                formIsvalid ? "profile__button" : "profile__button_disabled"
              }
              disabled={!formIsvalid}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__button" onClick={signOut}>
              Выйти из аккаунта
            </Link>
            <span className="profile__message">{props.statusText}</span>
          </form>
        </div>
      </div>
    </>
  );
}
export default Profile;
