import React, { useState, useEffect } from "react";

import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";

import Preloader from "../Preloader";
import "./Movies.css";

import { FILTER_DURATION, RENDER_MOVIE } from "../../utils/constants";

function Movies(props) {
  // const [rendered, setRendered] = useState([]);
  const [count, setCount] = useState(RENDER_MOVIE);
  const [more, setMore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [check, setCheck] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const loadMore = () => {
    setMore(more + count);
  };

  const onSubmit = (input) => {
    props.findMovies(input);
  };

  const saveMovie = (card) => {
    props.saveMovie(card);
  };
  const deleteMovie = (card) => {
    props.deleteMovie(card);
  };

  const filterShortFilm = (moviesToFilter) =>
    moviesToFilter.filter((item) => item.duration < FILTER_DURATION);

  const HandleCheck = () => {
    localStorage.setItem("check", !check);
    setCheck(!check);
  };

  useEffect(() => {
    // setCheck(localStorage.getItem("check"));
    props.movies.length > count + more ? setIsActive(true) : setIsActive(false);

    props.movies.length === 0 ? setDisabled(true) : setDisabled(false);
  }, [props.movies, more, count, check]);

  const duration = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = Math.floor(num - hours * 60);
    return `${
      hours > 0 ? hours + " ч : " + minutes + " мин" : minutes + " мин"
    }`;
  };
  return (
    <>
      <Header isLogedIn={props.isLogedIn} burgerMenu={props.handleBurgerMenu} />
      <SearchForm
        disabled={disabled}
        onSubmit={onSubmit}
        checked={props.checked}
        handleCheck={HandleCheck}
      ></SearchForm>

      <div className="movies">
        <span className="movies__text">{props.movieText}</span>
        {props.loading ? (
          <Preloader loading={props.loading}></Preloader>
        ) : check ? (
          filterShortFilm(props.movies)
            .slice(0, count + more)
            .map((card) => {
              return (
                <MoviesCard
                  card={card}
                  name={card.nameRU}
                  duration={duration(card.duration)}
                  image={`https://api.nomoreparties.co${card.image.url}`}
                  key={card.id}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  loading={props.loading}
                  trailer={card.trailerLink}
                ></MoviesCard>
              );
            })
        ) : (
          props.movies.slice(0, count + more).map((card) => {
            return (
              <MoviesCard
                card={card}
                name={card.nameRU}
                duration={duration(card.duration)}
                image={`https://api.nomoreparties.co${card.image.url}`}
                key={card.id}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                loading={props.loading}
                trailer={card.trailerLink}
              ></MoviesCard>
            );
          })
        )}

        <button
          className={isActive ? "movies__else" : "movies__else_dis"}
          onClick={loadMore}
        >
          Еще
        </button>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Movies;
