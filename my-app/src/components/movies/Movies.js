import React, { useState } from "react";
import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";
import BurgerMenu from "./BurgerMenu";

import "./Movies.css";

function Movies(props) {
  return (
    <>
      <Header isMain={false} burgerMenu={props.handleBurgerMenu} />
      <SearchForm></SearchForm>
      <div className="movies">
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <button className="movies__else">Еще</button>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Movies;
