import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import loop from "../../images/loop.svg";
import "./SearchForm.css";

function SearchForm(props) {
  const location = useLocation();
  const [input, setInput] = useState("");
  const [inputSaved, setInputSaved] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  useEffect(() => {
    setInput(localStorage.getItem("input"));
    setInputSaved(localStorage.getItem("inputSaved"));
  }, []);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <img className="search__loop" src={loop} alt="лупа"></img>
        <input
          className="search__input"
          type="search"
          placeholder="Фильмы"
          required
          value={
            location.pathname === "/movies" ? input || "" : inputSaved || ""
          }
          onChange={(e) => {
            setInput(e.target.value);
            setInputSaved(e.target.value);
          }}
        ></input>
        <button className="search__button" type="submit">
          {" "}
          Найти
        </button>
        <div className="search__divader"></div>
        <div className="search__checkbox-wrapper">
          <input
            className="search__checkbox"
            type="checkbox"
            defaultChecked={
              location.pathname === "/movies"
                ? props.checked
                : props.savedChecked
            }
            onChange={
              location.pathname === "/movies"
                ? props.handleCheck
                : props.savedHandleCheck
            }
          ></input>
          <p className="search__text">Короткометражки</p>
        </div>
      </form>
      <div className="search__border"></div>
    </div>
  );
}
export default SearchForm;
