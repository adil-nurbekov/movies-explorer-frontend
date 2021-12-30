import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(props) {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmitButton = (e) => {
    e.preventDefault();
    props.onRegister(name, email, password);
  };

  useEffect(() => {
    setIsFormValid(emailIsValid && nameIsValid && passwordIsValid);
  }, [emailIsValid, nameIsValid, passwordIsValid]);

  return (
    <section className="registration">
      <div className="registration__wrapper">
        <Link to="/" className="registration__logo"></Link>
        <h1 className="registration__header">Добро пожаловать!</h1>
        <form
          className="registration__form"
          onSubmit={handleSubmitButton}
          isValid={isFormValid}
        >
          <p className="registration__label">Имя</p>
          <input
            minLength="2"
            maxLength="40"
            required
            className="registration__text"
            id="user-name"
            type="string"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameIsValid(e.target.checkValidity());
              setErrorName(e.target.validationMessage);
            }}
          ></input>
          <span className="registration__error">{errorName}</span>
          <p className="registration__label">E-mail</p>
          <input
            minLength="2"
            maxLength="40"
            required
            className="registration__text"
            id="user-email"
            type="email"
            value={email}
            pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailIsValid(e.target.checkValidity());
              setErrorEmail(e.target.validationMessage);
            }}
          ></input>
          <span className="registration__error">{errorEmail}</span>
          <p className="registration__label">Пароль</p>
          <input
            minLength="5"
            maxLength="40"
            required
            className="registration__text"
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordIsValid(e.target.checkValidity());
              setErrorPassword(e.target.validationMessage);
            }}
          ></input>
          <span className="registration__error">{errorPassword}</span>
          <button
            className={
              isFormValid
                ? "registration__button"
                : "registration__button_disabled"
            }
            type="submit"
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </button>
          <span className="registration__message">{props.statusText}</span>
        </form>
        <div className="registration__signup">
          <p className="registration__text">
            Уже зарегистрированы?{" "}
            <Link to="/signin" className="registration__signin_link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
