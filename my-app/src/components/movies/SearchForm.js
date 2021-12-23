import React, { useState } from "react";
import loop from "../../images/loop.svg";
import "./SearchForm.css";

function SearchForm(props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <img className="search__loop" src={loop} alt="лупа"></img>
        <input
          className="search__input"
          type="search"
          placeholder="Фильмы"
          required
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
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
