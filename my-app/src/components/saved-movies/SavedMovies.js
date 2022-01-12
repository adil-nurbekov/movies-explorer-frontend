import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchForm from "../movies/SearchForm";
import SavedMoviesCard from "./SavedMoviesCard";
import Footer from "../Footer";
import "./SavedMovies.css";

function SavedMovies(props) {
  const [savedRendered, setSavedRendered] = useState(props.savedMovies);
  // const [savedChecked, setSavedChecked] = useState(false);
  const [savedDisabled, setSavedDisabled] = useState(true);
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
    props.handleSubmit(input);
  };

  useEffect(() => {
    if (props.savedMovies.length !== 0) {
      setSavedDisabled(false);
    }
    props.savedChecked
      ? setSavedRendered(
          props.savedMovies.filter((movie) => movie.duration <= 40)
        )
      : setSavedRendered(props.savedMovies);
  }, [props.savedChecked, props.savedMovies]);

  return (
    <>
      <Header isLogedIn={props.isLogedIn} burgerMenu={props.handleBurgerMenu} />
      <SearchForm
        onSubmit={onSubmit}
        savedChecked={props.savedChecked}
        savedHandleCheck={props.savedHandleCheck}
        savedDisabled={savedDisabled}
      ></SearchForm>
      <div className="saved">
        <div className="saved__empty">{props.movieText}</div>{" "}
        {savedRendered.map((card) => {
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
