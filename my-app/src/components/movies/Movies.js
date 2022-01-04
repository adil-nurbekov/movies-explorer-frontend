import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";

import Preloader from "../Preloader";
import "./Movies.css";

function Movies(props) {
  // const movies = React.useContext(AllMovies);
  const [rendered, setRendered] = useState([]);
  const [count, setCount] = useState(7);
  const [more, setMore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const location = useLocation().pathname;
  const loadMore = () => {
    setMore(more + count);
    console.log(more + count);
    if (props.movies.length <= more + count) {
      setIsActive(false);
    }
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

  const handleCheck = () => {
    setChecked(!checked);
    localStorage.setItem("check", checked);
  };

  useEffect(() => {
    checked
      ? setRendered(props.movies.filter((movie) => movie.duration <= 40))
      : setRendered(props.movies);
    // setChecked(localStorage.getItem("checked"));
  }, [checked, props.movies]);

  useEffect(() => {
    if (location === "/movies") {
      setRendered(props.movies.slice(0, count + more));
      if (props.movies.length <= count + more) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    } else {
      setRendered(props.movies);
      setIsActive(false);
      console.log(props.movies);
    }
  }, [props.movies, count, more]);

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
        onSubmit={onSubmit}
        checked={checked}
        handleCheck={handleCheck}
      ></SearchForm>

      <div className="movies">
        <span className="movies__text">{props.movieText}</span>
        <Preloader loading={props.loading}></Preloader>

        {props.movies.length !== 0 ? (
          rendered.map((card) => {
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
