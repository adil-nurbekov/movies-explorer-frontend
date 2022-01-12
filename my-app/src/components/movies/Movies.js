import React, { useState, useEffect } from "react";

import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";

import Preloader from "../Preloader";
import "./Movies.css";

function Movies(props) {
  const [rendered, setRendered] = useState([]);
  const [count, setCount] = useState(7);
  const [more, setMore] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [disabled, setDisabled] = useState(true);

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

  useEffect(() => {
    if (props.movies.length > count + more) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    if (props.movies.length !== 0) {
      setDisabled(false);
    }
    props.checked
      ? setRendered(props.movies.filter((movie) => movie.duration <= 40))
      : setRendered(props.movies);
  }, [props.checked, props.movies, more, count]);

  // useEffect(() => {
  //   if (location === "/movies") {
  //     setRendered(props.movies.slice(0, count + more));
  //     if (props.movies.length <= count + more) {
  //       setIsActive(false);
  //     } else {
  //       setIsActive(true);
  //     }
  //   }
  // }, [props.movies, count, more]);

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
        handleCheck={props.handleCheck}
      ></SearchForm>

      <div className="movies">
        <span className="movies__text">{props.movieText}</span>
        {props.loading ? (
          <Preloader loading={props.loading}></Preloader>
        ) : props.movies.length !== 0 ? (
          rendered.slice(0, count + more).map((card) => {
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
          <span></span>
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
