import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";

import { AllMovies } from "../../context/AllMovies";
import Preloader from "../Preloader";
import "./Movies.css";

function Movies(props) {
  const movies = React.useContext(AllMovies);
  const [count, setCount] = useState(7);
  const [more, setMore] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const loadMore = () => {
    setMore(more + count);
    console.log(more);
    if (movies.length < more + count) {
      setIsActive(false);
    }
  };

  const onSubmit = (checked) => {
    props.findMovies(checked);
    if (movies.length > 0) {
      setIsActive(true);
    }
  };

  const saveMovie = (card) => {
    props.saveMovie(card);
  };
  const deleteMovie = (card) => {
    props.deleteMovie(card);
  };

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
      <SearchForm onSubmit={onSubmit}></SearchForm>

      <div className="movies">
        <span className="movies__text">{props.movieText}</span>
        <Preloader loading={props.loading}></Preloader>
        {movies.slice(0, count + more).map((card) => {
          return (
            <MoviesCard
              card={card}
              name={card.nameRU}
              duration={duration(card.duration)}
              image={card.image}
              key={card.movieId}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              loading={props.loading}
              trailer={card.trailer}
            ></MoviesCard>
          );
        })}

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
