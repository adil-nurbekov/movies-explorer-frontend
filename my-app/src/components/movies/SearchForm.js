import React from "react";
import loop from "../../images/loop.svg";
import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <img className="search__loop" src={loop}></img>
        <input
          className="search__input"
          type="search"
          placeholder="Фильмы"
          required
        ></input>
        <button className="search__button" type="submit">
          {" "}
          Найти
        </button>
        <div className="search__divader"></div>
        <div className="search__checkbox-wrapper">
          <input className="search__checkbox" type="checkbox"></input>
          <p className="search__text">Короткометражки</p>
        </div>
      </form>
      <div className="search__border"></div>
    </div>
  );
}
export default SearchForm;
