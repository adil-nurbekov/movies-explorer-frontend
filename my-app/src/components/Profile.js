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

  const [emailisValid, setEmailIsValid] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [formIsvalid, setFormIsValid] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    props.change(name, email);
  };

  useEffect(() => {
    const current = user.name === name && user.email === email;
    if (current) {
      return setFormIsValid(false);
    }
    setFormIsValid(nameIsValid && emailisValid);
  }, [user, name, nameIsValid, email, emailisValid, formIsvalid]);

  return (
    <>
      <Header
        burgerMenu={props.handleBurgerMenu}
        isLogedIn={props.isLogedIn}
      ></Header>
      <div className="profile">
        <div className="profile__wrapper">
          <div className="profile__header">Привет {user.name}!</div>
          <form
            className="profile__form"
            onSubmit={onSubmit}
            isValid={formIsvalid}
          >
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
              pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
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
              disabled={formIsvalid ? false : true}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__button" onClick={props.onSignOut}>
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
