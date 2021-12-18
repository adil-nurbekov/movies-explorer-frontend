import React, { useState } from "react";
import Header from "../Header";
import SearchForm from "../movies/SearchForm";
import SavedMoviesCard from "./SavedMoviesCard";
import Footer from "../Footer";
import BurgerMenu from "../movies/BurgerMenu";

import "./SavedMovies.css";

function SavedMovies(props) {
  return (
    <>
      <Header isMain={false} burgerMenu={props.handleBurgerMenu} />
      <SearchForm></SearchForm>
      <div className="saved">
        <SavedMoviesCard></SavedMoviesCard>
        <SavedMoviesCard></SavedMoviesCard>
        <SavedMoviesCard></SavedMoviesCard>
      </div>
      <Footer></Footer>
    </>
  );
}
export default SavedMovies;
