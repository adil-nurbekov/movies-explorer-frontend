import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitButton = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  };

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
            }}
          ></input>
          <p className="login__label">Пароль</p>
          <input
            minLength="2"
            maxLength="40"
            required
            className="login__text"
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="login__button" type="submit">
            Войти
          </button>
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
