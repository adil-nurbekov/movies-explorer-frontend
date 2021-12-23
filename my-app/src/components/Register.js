import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmitButton = (e) => {
    e.preventDefault();
    props.onRegister(email, password, name);
  };

  return (
    <section className="registration">
      <div className="registration__wrapper">
        <Link to="/" className="registration__logo"></Link>
        <h1 className="registration__header">Добро пожаловать!</h1>
        <form className="registration__form" onSubmit={handleSubmitButton}>
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
            }}
          ></input>
          <p className="registration__label">E-mail</p>
          <input
            minLength="2"
            maxLength="40"
            required
            className="registration__text"
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p className="registration__label">Пароль</p>
          <input
            minLength="2"
            maxLength="40"
            required
            className="registration__text"
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="registration__button" type="submit">
            Зарегистрироваться
          </button>
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
