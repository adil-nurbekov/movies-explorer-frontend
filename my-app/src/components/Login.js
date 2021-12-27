import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmitButton = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  };

  useEffect(() => {
    setIsFormValid(emailIsValid && passwordIsValid);
  });

  return (
    <section className="login">
      <div className="login__wrapper">
        <Link to="/" className="login__logo"></Link>
        <h1 className="login__header">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmitButton}>
          <p className="login__label">E-mail</p>
          <input
            minLength="2"
            maxLength="40"
            required
            className="login__text"
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorEmail(e.target.validationMessage);
              setEmailIsValid(e.target.checkValidity());
            }}
          ></input>
          <span className="c">{errorEmail}</span>
          <p className="login__label">Пароль</p>
          <input
            minLength="5"
            maxLength="40"
            required
            className="login__text"
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPassword(e.target.validationMessage);
              setPasswordIsValid(e.target.checkValidity());
            }}
          ></input>
          <span className="login__error">{errorPassword}</span>

          <button
            className={isFormValid ? "login__button" : "login__button_disabled"}
            type="submit"
            disabled={!isFormValid}
          >
            Войти
          </button>
          <span className="login__message">{props.statusText}</span>
        </form>
        <div className="login__signup">
          <p className="login__text">
            Еще не зарегистрированы?{" "}
            <Link to="/signup" className="login__signup_link">
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
export default Login;
