import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchForm from "../movies/SearchForm";
import SavedMoviesCard from "./SavedMoviesCard";
import Footer from "../Footer";
import "./SavedMovies.css";
import { NOT_FOUND } from "../../utils/constants";

import { FILTER_DURATION } from "../../utils/constants";

function SavedMovies(props) {
  const [savedRendered, setSavedRendered] = useState([]);
  const [savedChecked, setSavedChecked] = useState(false);
  const [savedDisabled, setSavedDisabled] = useState(true);
  const [movieText, setMovieText] = useState("");

  const duration = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = Math.floor(num - hours * 60);
    return `${
      hours > 0 ? hours + " ч : " + minutes + " мин" : minutes + " мин"
    }`;
  };
  const deleteCard = (card) => {
    props.deleteCard(card);
  };
  const onSubmit = (input) => {
    setTimeout(() => {
      localStorage.setItem("inputSaved", input);
      const savedMoviesArray = props.savedMovies.filter((m) =>
        JSON.stringify(m.nameRU || m.nameEN)
          .toLowerCase()
          .includes(input.toLowerCase())
      );
      if (savedMoviesArray.length === 0) {
        setSavedRendered([]);
        setMovieText(NOT_FOUND);
        return;
      } else {
        setSavedRendered(savedMoviesArray);
        setMovieText("");
      }
    }, 600);
    setTimeout(() => {
      setMovieText("");
    }, 1000);
  };

  const filterShortFilm = (moviesToFilter) =>
    moviesToFilter.filter((item) => item.duration < FILTER_DURATION);

  const savedHandleCheck = () => {
    localStorage.setItem("savedCheck", !savedChecked);
    setSavedChecked(!savedChecked);
  };
  useEffect(() => {
    setSavedRendered(JSON.parse(localStorage.getItem("savedMovies")));
  }, []);

  useEffect(() => {
    props.savedMovies.length === 0
      ? setSavedDisabled(true)
      : setSavedDisabled(false);
  });

  return (
    <>
      <Header isLogedIn={props.isLogedIn} burgerMenu={props.handleBurgerMenu} />
      <SearchForm
        onSubmit={onSubmit}
        savedChecked={savedChecked}
        savedHandleCheck={savedHandleCheck}
        savedDisabled={savedDisabled}
      ></SearchForm>
      <div className="saved">
        <div className="saved__empty">{movieText}</div>{" "}
        {savedChecked
          ? filterShortFilm(savedRendered).map((card) => {
              return (
                <SavedMoviesCard
                  card={card}
                  image={card.image}
                  name={card.nameRU}
                  key={card._id}
                  duration={duration(card.duration)}
                  deleteCard={deleteCard}
                  trailer={card.trailer}
                ></SavedMoviesCard>
              );
            })
          : savedRendered.map((card) => {
              return (
                <SavedMoviesCard
                  card={card}
                  image={card.image}
                  name={card.nameRU}
                  key={card._id}
                  duration={duration(card.duration)}
                  deleteCard={deleteCard}
                  trailer={card.trailer}
                ></SavedMoviesCard>
              );
            })}
      </div>
      <Footer></Footer>
    </>
  );
}
export default SavedMovies;
